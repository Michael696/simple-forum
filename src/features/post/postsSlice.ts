import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {Id, MiddlewareExtraArgument, PostItemType, PostStateType, User} from "../../app/types";
import {findUserById} from "../currentUser/currentUserSlice";
import {isValid as isValidDate} from "date-fns";
import {FETCH_PERIOD} from "../../app/settings";
import {debug, limit} from "../../app/helpers";
import {emptyPost} from "../../app/objects";
import {userApi} from "../../app/userApi";

const initialState: PostStateType = {
    postIds: [],
    postData: [],
    threadId: '',
    lastFetch: '',
    firstPostIdx: -1,
    lastPostIdx: -1,
    totalCount: -1,
    perPageCount: 3,
    isLoading: 'idle'
};

const findPostById = (list: Array<PostItemType>, id: Id) => list.find(post => post.id === id);

// export const selectPostsIsLoading = (state: RootState) => state.posts.isLoading;
export const selectPosts = (state: RootState) => state.posts.postIds;
export const selectPostWithId = (state: RootState, id: Id) => findPostById(state.posts.postData, id) || emptyPost;
export const selectPostLikes = (state: RootState, id: Id) => {
    const post = findPostById(state.posts.postData, id);
    return post ? post.likes : [];
};
export const selectPostDislikes = (state: RootState, id: Id) => {
    const post = findPostById(state.posts.postData, id);
    return post ? post.dislikes : [];
};

const addOnly = (first: Array<User>, user: User) => {
    const userLiked = findUserById(first, user.id);
    let firstRes = [...first];
    if (!userLiked) {
        firstRes.push(user);
    }
    return firstRes;
};

const removeLikeDislike = (first: Array<User>, user: User) => {
    return first.filter(u => u.id !== user.id); // may be .splice()?
};

const removeAll = (first: Array<User>, second: Array<User>, user: User) => {
    const firstRes = removeLikeDislike(first, user);
    const secondRes = removeLikeDislike(second, user);
    return {first: firstRes, second: secondRes};
};

const addLike2 = (likes: Array<User>, dislikes: Array<User>, user: User) => {
    const {second} = removeAll(likes, dislikes, user);
    return {first: addOnly(likes, user), second};
};

const addDislike2 = (likes: Array<User>, dislikes: Array<User>, user: User) => {
    const {first} = removeAll(likes, dislikes, user);
    return {first, second: addOnly(dislikes, user)};
};

const hasLikeDislike = (first: Array<User>, user: User) => {
    return first.some(u => u.id === user.id);
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postIdsLoad: (state: PostStateType, action: PayloadAction<Id>) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.threadId = action.payload;
                state.lastFetch = new Date().toISOString();
            }
        },
        postIdsDone: (state: PostStateType, action: PayloadAction<{ postIds: Array<Id>, firstPostIdx: number, lastPostIdx: number }>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.postIds = action.payload.postIds;
                // state.postData = []; // !!!
                state.firstPostIdx = action.payload.firstPostIdx;
                state.lastPostIdx = action.payload.lastPostIdx;
            }
        },
        postDoneSingle: (state: PostStateType, action: PayloadAction<PostItemType>) => {
            const postIdx = state.postData.findIndex(post => post.id === action.payload.id);
            if (!!~postIdx) {
                state.postData[postIdx] = action.payload;
            } else {
                state.postData.push(action.payload); // TODO need to remove posts from state later !!!
            }
        },
        postLike: (state: PostStateType, action: PayloadAction<{ postId: Id, user: User }>) => {
            const post = findPostById(state.postData, action.payload.postId);
            if (post) {
                const user = action.payload.user;
                const likes = post.likes;
                const dislikes = post.dislikes;
                if (hasLikeDislike(likes, user)) { // has likes
                    post.likes = removeLikeDislike(likes, user);
                } else {
                    const {first, second} = addLike2(likes, dislikes, action.payload.user);
                    post.likes = first;
                    post.dislikes = second;
                }
            }
        },
        postDislike: (state: PostStateType, action: PayloadAction<{ postId: Id, user: User }>) => {
            const post = findPostById(state.postData, action.payload.postId);
            if (post) {
                const user = action.payload.user;
                const likes = post.likes;
                const dislikes = post.dislikes;
                if (hasLikeDislike(dislikes, user)) { // has dislikes
                    post.dislikes = removeLikeDislike(dislikes, user);
                } else {
                    const {first, second} = addDislike2(likes, dislikes, action.payload.user);
                    post.likes = first;
                    post.dislikes = second;
                }
            }
        },
        postText: (state: PostStateType, action: PayloadAction<{ postId: Id, text: string }>) => {
            const post = findPostById(state.postData, action.payload.postId);
            if (post) {
                post.text = action.payload.text;
            }
        },
        postRemove: (state: PostStateType, action: PayloadAction<{ id: Id }>) => {
            const post = findPostById(state.postData, action.payload.id);
            if (post) {
                state.postData = state.postData.filter(post => post.id !== action.payload.id);
            }
        },
        postTotalCount: (state: PostStateType, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        postsClear: (state: PostStateType) => {
            for (let key in initialState) {
                // @ts-ignore
                state[key] = initialState[key];
            }
        }
    },
});

const {postIdsLoad, postIdsDone, postText, postRemove, postTotalCount, postDoneSingle} = postsSlice.actions;
export const {postLike, postDislike, postsClear} = postsSlice.actions;

export const selectTotalPages = (state: RootState) => {
    const posts = state.posts;
    return Math.ceil(posts.totalCount / posts.perPageCount)
};

export const fetchPosts = ({threadId, page}: { threadId: Id, page: number }, force: boolean = false) =>
    async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => {
        const {userApi} = extraArgument;
        const postsSlice = getState().posts;
        const lastFetch = new Date(postsSlice.lastFetch);
        const start = (page - 1) * postsSlice.perPageCount;
        const end = page * postsSlice.perPageCount - 1;
        const startLimited = limit(start, 0, Number.MAX_SAFE_INTEGER);
        const endLimited = limit(end, start, Number.MAX_SAFE_INTEGER);
        if (force || ((!isValidDate(lastFetch) || Date.now().valueOf() - lastFetch.valueOf() > FETCH_PERIOD
            || threadId !== postsSlice.threadId
            || startLimited !== postsSlice.firstPostIdx // TODO refactor conditions to function ?
            || end !== postsSlice.lastPostIdx
            || postsSlice.postIds.length === 0)
            && postsSlice.isLoading === 'idle')) {

            debug('fetch posts count', threadId);
            const count = await userApi.getPostCount({id: threadId});
            if (count) {
                dispatch(postTotalCount(count));
                debug('fetch posts', threadId, startLimited, endLimited);
                dispatch(postIdsLoad(threadId));
                const request = {id: threadId, start: startLimited, end: endLimited};
                const response = await userApi.fetchPosts(request);
                // console.log('fetchPosts res', response);
                if (response) {
                    dispatch(postIdsDone({
                        postIds: response.posts || [],
                        firstPostIdx: response.start || 0,
                        lastPostIdx: response.end || response.posts.length - 1
                    }));
                    return;
                }
            }
            dispatch(postIdsDone({
                postIds: [],
                firstPostIdx: -1,
                lastPostIdx: -1
            }));
        } else {
            debug('fetch posts skipped', threadId);
        }
    };

export const fetchPostWithId = ({id}: { id: Id }) =>
    async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => { // TODO post caching
        debug('fetch post with id ', id);
        const post = await userApi.fetchPostWithId({id});
        if (post) {
            dispatch(postDoneSingle(post));
        }
    };

export const setPostText = (postId: Id, text: string) =>
    async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => {
        const {userApi} = extraArgument;
        const result = await userApi.setPostText({text, postId});
        if (!!result && !result.error) {
            dispatch(postText({postId, text}));
        } else {
            debug(`cannot set post ${postId} text: server error`);
        }
    };

export const removePost = (id: Id) =>
    async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => {
        const {userApi} = extraArgument;
        const result = await userApi.removePost({id});
        if (!!result && !result.error) {
            dispatch(postRemove({id}));
        } else {
            debug(`cannot remove post ${id}: server error`);
        }
    };

export const addPostLike = ({postId, user}: { postId: Id, user: User }) =>
    async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => {
        const {userApi} = extraArgument;
        const state = getState();
        const post = selectPostWithId(state, postId);
        if (!hasLikeDislike(post.likes, user)) { // has no likes, let's go
            const result = await userApi.addPostLike({postId}); // use user from session on back
            if (!!result && !result.error) {
                dispatch(postLike({postId, user}));
            } else {
                debug(`cannot like post '${postId}' by user '${user.name}': server error`);
            }
        }
    };

export const addPostDislike = ({postId, user}: { postId: Id, user: User }) =>
    async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => {
        const {userApi} = extraArgument;
        const state = getState();
        const post = selectPostWithId(state, postId);
        if (!hasLikeDislike(post.dislikes, user)) { // has no dislikes, let's go
            const result = await userApi.addPostDislike({postId}); // use user from session on back
            if (!!result && !result.error) {
                dispatch(postDislike({postId, user}));
            } else {
                debug(`cannot dislike post '${postId}' by user '${user.name}': server error`);
            }
        }
    };

export const addPost = ({text, userId, forumId, threadId}: { text: string, userId: Id, forumId: Id, threadId: Id }) =>
    async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => {
        const {userApi} = extraArgument;
        debug('create post for thread', threadId, text);
        const post = await userApi.createPost({forumId, threadId, userId, text});
        debug('created post with id:', post);
        if (post) {
            const totalPages = selectTotalPages(getState());
            dispatch(fetchPosts({threadId, page: totalPages}, true));
        }
    };

export default postsSlice.reducer;