import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, PostItemType, PostStateType, User} from "../../app/types";
import {findUserById} from "../currentUser/currentUserSlice";
import {isValid as isValidDate} from "date-fns";
import {FETCH_PERIOD} from "../../app/settings";

const initialState: PostStateType = {
    list: [],
    threadId: '',
    lastFetch: '',
    firstPostIdx: 0,
    lastPostIdx: 0,
    totalCount: 0,
    perPageCount: 3,
    isLoading: 'idle'
};

const findPostById = (list: Array<PostItemType>, id: Id) => list.filter(post => post.id === id)[0];

export const postsIsLoading = state => state.posts.isLoading;
export const postsList = state => state.posts.list;
export const postWithId = (state, id: Id) => findPostById(state.posts.list, id);

const addOnly = (first: Array<User>, user: User) => {
    const userLiked = findUserById(first, user.id);
    let firstRes = [...first];
    if (!userLiked) {
        firstRes.push(user);
    }
    return firstRes;
};

const removeLikeDislike = (first: Array<User>, user: User) => {
    return first.filter(u => u.id !== user.id);
};

const removeAll = (first: Array<User>, second: Array<User>, user: User) => {
    const firstRes = removeLikeDislike(first, user);
    const secondRes = removeLikeDislike(second, user);
    return {first: firstRes, second: secondRes};
};

const addLike2 = (likes: Array<User>, dislikes: Array<User>, user: User) => {
    const {first, second} = removeAll(likes, dislikes, user);
    return {first: addOnly(likes, user), second};
};

const addDislike2 = (likes: Array<User>, dislikes: Array<User>, user: User) => {
    const {first, second} = removeAll(likes, dislikes, user);
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
                state.list = [];
                state.threadId = action.payload;
                state.lastFetch = new Date().toISOString();
            }
        },
        postsDone: (state: PostStateType, action: PayloadAction<{ list: PostItemType[], firstPostIdx: number, lastPostIdx: number }>) => { // TODO feed threadId to this action ?
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.list = action.payload.list;
                state.firstPostIdx = action.payload.firstPostIdx;
                state.lastPostIdx = action.payload.lastPostIdx;
            }
        },
        postLike: (state: PostStateType, action: PayloadAction<{ postId: Id, user: User }>) => {
            const post = findPostById(state.list, action.payload.postId);
            const user = action.payload.user;
            if (hasLikeDislike(post.likes, user)) { // has likes
                post.likes = removeLikeDislike(post.likes, user);
            } else {
                const {first, second} = addLike2(post.likes, post.dislikes, action.payload.user);
                post.likes = first;
                post.dislikes = second;
            }
        },
        postDislike: (state: PostStateType, action: PayloadAction<{ postId: Id, user: User }>) => {
            const post = findPostById(state.list, action.payload.postId);
            const user = action.payload.user;
            if (hasLikeDislike(post.dislikes, user)) { // has dislikes
                post.dislikes = removeLikeDislike(post.dislikes, user);
            } else {
                const {first, second} = addDislike2(post.likes, post.dislikes, action.payload.user);
                post.likes = first;
                post.dislikes = second;
            }
        },
        postText: (state: PostStateType, action: PayloadAction<{ postId: Id, text: string }>) => {
            const post = findPostById(state.list, action.payload.postId);
            if (post) {
                post.text = action.payload.text;
            }
        },
        postRemove: (state: PostStateType, action: PayloadAction<{ id: Id }>) => {
            const post = findPostById(state.list, action.payload.id);
            if (post) {
                state.list = state.list.filter(post => post.id !== action.payload.id);
            }
        },
        postCount: (state: PostStateType, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        }
    },
});

const {postsLoad, postsDone, postText, postRemove, postCount} = postsSlice.actions;
export const {postLike, postDislike} = postsSlice.actions;

export const postsTotalPages = state => {
    const posts = state.posts;
    return Math.ceil(posts.totalCount / posts.perPageCount)
};

export const fetchPosts = ({threadId, page}: { threadId: Id, page: number }) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const postsSlice = getState().posts;
        const now = new Date();
        const lastFetch = new Date(postsSlice.lastFetch);
        const start = (page - 1) * postsSlice.perPageCount;
        const end = page * postsSlice.perPageCount - 1;
        //@ts-ignore
        if ((!isValidDate(lastFetch) || now - lastFetch > FETCH_PERIOD // TODO subtract dates nicer?
            || threadId !== postsSlice.threadId
            || start !== postsSlice.firstPostIdx // TODO refactor conditions to function ?
            || end !== postsSlice.lastPostIdx
            || postsSlice.list.length === 0)
            && postsSlice.isLoading === 'idle') { // TODO investigate side effects

            console.log('fetch posts', threadId);
            await fetchPostCount(threadId)(dispatch, getState); // !!! ???
            dispatch(postsLoad(threadId));
            const response = await userApi.fetchPosts({id: threadId, start, end});
            dispatch(postsDone({
                list: response.posts,
                firstPostIdx: response.start || 0,
                lastPostIdx: response.end || response.posts.length - 1
            }));
        } else {
            console.log('fetch posts skipepd', threadId);
        }
    };

const fetchPostCount = (threadId) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const count = await userApi.getPostCount({id: threadId});
    dispatch(postCount(count));
};

export const setPostText = (postId, text) => async (dispatch: AppDispatch) => {
    const result = await userApi.setPostText({text, postId});
    if (!!result && !result.error) { // TODO is that ok ? (false positives possible?)
        dispatch(postText({postId, text}));
    } else {
        console.log(`cannot set post ${postId} text: server error`);
    }
};

export const removePost = (id) => async (dispatch: AppDispatch) => {
    const result = await userApi.removePost({id});
    if (!!result && !result.error) {
        dispatch(postRemove({id}));
    } else {
        console.log(`cannot remove post ${id}: server error`);
    }
};

export default postsSlice.reducer;