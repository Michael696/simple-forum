import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, PostItemStateType, PostItemType, PostStateType, User} from "../../app/types";
import {findUserById} from "../currentUser/currentUserSlice";
import {isValid as isValidDate} from "date-fns";
import {FETCH_PERIOD} from "../../app/settings";
import {debug} from "../../app/debug";
import {emptyPost} from "../../app/objects";

const initialState: PostStateType = {
    entries: {items: [], likes: {}, dislikes: {}},
    threadId: '',
    lastFetch: '',
    firstPostIdx: -1,
    lastPostIdx: -1,
    totalCount: -1,
    perPageCount: 3,
    isLoading: 'idle'
};

const findPostById = (list: Array<PostItemStateType>, id: Id) => list.filter(post => post.id === id)[0];

// export const selectPostsIsLoading = (state: RootState) => state.posts.isLoading;
export const selectPosts = (state: RootState) => state.posts.entries.items;
export const selectPostWithId = (state: RootState, id: Id) => findPostById(state.posts.entries.items, id) || emptyPost;
export const selectPostLikes = (state: RootState, id: Id) => state.posts.entries.likes[id] || [];
export const selectPostDislikes = (state: RootState, id: Id) => state.posts.entries.dislikes[id] || [];

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
        postsLoad: (state: PostStateType, action: PayloadAction<Id>) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.threadId = action.payload;
                state.lastFetch = new Date().toISOString();
            }
        },
        postsDone: (state: PostStateType, action: PayloadAction<{ list: PostItemType[], firstPostIdx: number, lastPostIdx: number }>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.entries.items = action.payload.list;
                const likes = {}, dislikes = {};
                action.payload.list.forEach(post => {
                    // @ts-ignore
                    likes[post.id] = post.likes;
                    // @ts-ignore
                    dislikes[post.id] = post.dislikes;
                });
                state.entries.likes = likes;
                state.entries.dislikes = dislikes;
                state.firstPostIdx = action.payload.firstPostIdx;
                state.lastPostIdx = action.payload.lastPostIdx;
            }
        },
        postLike: (state: PostStateType, action: PayloadAction<{ postId: Id, user: User }>) => {
            const post = findPostById(state.entries.items, action.payload.postId);
            const user = action.payload.user;
            const likes = state.entries.likes[post.id];
            const dislikes = state.entries.dislikes[post.id];
            if (hasLikeDislike(likes, user)) { // has likes
                state.entries.likes[post.id] = removeLikeDislike(likes, user);
            } else {
                const {first, second} = addLike2(likes, dislikes, action.payload.user);
                state.entries.likes[post.id] = first;
                state.entries.dislikes[post.id] = second;
            }
        },
        postDislike: (state: PostStateType, action: PayloadAction<{ postId: Id, user: User }>) => {
            const post = findPostById(state.entries.items, action.payload.postId);
            const user = action.payload.user;
            const likes = state.entries.likes[post.id];
            const dislikes = state.entries.dislikes[post.id];
            if (hasLikeDislike(dislikes, user)) { // has dislikes
                state.entries.dislikes[post.id] = removeLikeDislike(dislikes, user);
            } else {
                const {first, second} = addDislike2(likes, dislikes, action.payload.user);
                state.entries.likes[post.id] = first;
                state.entries.dislikes[post.id] = second;
            }
        },
        postText: (state: PostStateType, action: PayloadAction<{ postId: Id, text: string }>) => {
            const post = findPostById(state.entries.items, action.payload.postId);
            if (post) {
                post.text = action.payload.text;
            }
        },
        postRemove: (state: PostStateType, action: PayloadAction<{ id: Id }>) => {
            const post = findPostById(state.entries.items, action.payload.id);
            if (post) {
                state.entries.items = state.entries.items.filter(post => post.id !== action.payload.id);
            }
        },
        postCount: (state: PostStateType, action: PayloadAction<number>) => {
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

const {postsLoad, postsDone, postText, postRemove, postCount} = postsSlice.actions;
export const {postLike, postDislike, postsClear} = postsSlice.actions;

export const selectTotalPages = (state: RootState) => {
    const posts = state.posts;
    return Math.ceil(posts.totalCount / posts.perPageCount)
};

export const fetchPosts = ({threadId, page}: { threadId: Id, page: number }, force: boolean = false) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const postsSlice = getState().posts;
        const lastFetch = new Date(postsSlice.lastFetch);
        const start = (page - 1) * postsSlice.perPageCount;
        const end = page * postsSlice.perPageCount - 1;
        const startLimited = start >= 0 ? start : 0;
        const endLimited = end >= 0 ? end : 0;
        if (force || ((!isValidDate(lastFetch) || Date.now().valueOf() - lastFetch.valueOf() > FETCH_PERIOD
            || threadId !== postsSlice.threadId
            || startLimited !== postsSlice.firstPostIdx // TODO refactor conditions to function ?
            || end !== postsSlice.lastPostIdx
            || postsSlice.entries.items.length === 0)
            && postsSlice.isLoading === 'idle')) {

            debug('fetch posts', threadId, startLimited, endLimited);
            await fetchPostCount(threadId)(dispatch, getState); // !!! ???
            dispatch(postsLoad(threadId));
            const response = await userApi.fetchPosts({id: threadId, start: startLimited, end: endLimited});
            dispatch(postsDone({
                list: response.posts,
                firstPostIdx: response.start || 0,
                lastPostIdx: response.end || response.posts.length - 1
            }));
        } else {
            debug('fetch posts skipped', threadId);
        }
    };

const fetchPostCount = (threadId: Id) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const count = await userApi.getPostCount({id: threadId});
    dispatch(postCount(count));
};

export const setPostText = (postId: Id, text: string) => async (dispatch: AppDispatch) => {
    const result = await userApi.setPostText({text, postId});
    if (!!result && !result.error) {
        dispatch(postText({postId, text}));
    } else {
        debug(`cannot set post ${postId} text: server error`);
    }
};

export const removePost = (id: Id) => async (dispatch: AppDispatch) => {
    const result = await userApi.removePost({id});
    if (!!result && !result.error) {
        dispatch(postRemove({id}));
    } else {
        debug(`cannot remove post ${id}: server error`);
    }
};

export const addPostLike = ({postId, user}: { postId: Id, user: User }) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const post = selectPostWithId(state, postId);
    if (!hasLikeDislike(state.posts.entries.likes[post.id], user)) { // has no likes, let's go
        const result = await userApi.addPostLike({postId}); // use user from session on back
        if (!!result && !result.error) {
            dispatch(postLike({postId, user}));
        } else {
            debug(`cannot like post '${postId}' by user '${user.name}': server error`);
        }
    }
};

export const addPostDislike = ({postId, user}: { postId: Id, user: User }) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const post = selectPostWithId(state, postId);
    if (!hasLikeDislike(state.posts.entries.dislikes[post.id], user)) { // has no dislikes, let's go
        const result = await userApi.addPostDislike({postId}); // use user from session on back
        if (!!result && !result.error) {
            dispatch(postDislike({postId, user}));
        } else {
            debug(`cannot dislike post '${postId}' by user '${user.name}': server error`);
        }
    }
};

export const addPost = ({text, userId, forumId, threadId}: { text: string, userId: Id, forumId: Id, threadId: Id }) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        debug('create post for thread', threadId, text);
        const post = await userApi.createPost({forumId, threadId, userId, text});
        debug('created post with id:', post);
        if (post) {
            const totalPages = selectTotalPages(getState());
            dispatch(fetchPosts({threadId, page: totalPages}, true));
        }
    };

export default postsSlice.reducer;