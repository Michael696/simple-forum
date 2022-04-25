import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, LoadingType, PostItemType, User} from "../../app/types";
import {findUserById} from "../currentUser/currentUserSlice";

type InitialStateType = {
    list: Array<PostItemType>,
    threadId: Id,
    isLoading: LoadingType
}

const initialState: InitialStateType = {
    list: [],
    threadId: '',
    isLoading: 'idle'
};

const findPostById = (list: Array<PostItemType>, id: Id) => list.filter(post => post.id === id)[0];

export const postsIsLoading = state => state.posts.isLoading;
export const postsList = state => state.posts.list;
export const postWithId = (state, id: Id) => findPostById(state.posts.list, id);

type LikeDislikeReducer = {
    state: InitialStateType,
    action: PayloadAction<{ postId: Id, user: User }>
};

const addLikeDislike = (first: Array<User>, second: Array<User>, postId: Id, user: User) => {
    const userLiked = findUserById(first, user.id);
    const userDisliked = findUserById(second, user.id);
    if (!userLiked) {
        first.push(user);
    }
    if (userDisliked) {
        second = second.filter(u => u.id !== user.id);
    }
    return {first, second};
};

export const postsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        postsLoad: (state: InitialStateType, action: PayloadAction<Id>) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.list = [];
                state.threadId = action.payload;
            }
        },
        postsDone: (state: InitialStateType, action: PayloadAction<PostItemType[]>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.list = action.payload;
            }
        },
        postLike: (state: InitialStateType, action: PayloadAction<{ postId: Id, user: User }>) => { // TODO declare as type
            const post = findPostById(state.list, action.payload.postId);
            const {first, second} = addLikeDislike(post.likes, post.dislikes, action.payload.postId, action.payload.user);
            post.likes = first;
            post.dislikes = second;
        },
        postDislike: (state: InitialStateType, action: PayloadAction<{ postId: Id, user: User }>) => { // TODO declare as type
            const post = findPostById(state.list, action.payload.postId);
            const {first, second} = addLikeDislike(post.dislikes, post.likes, action.payload.postId, action.payload.user);
            post.dislikes = first;
            post.likes = second;
        }
    },
});


const {postsLoad, postsDone} = postsSlice.actions;
export const {postLike, postDislike} = postsSlice.actions;

export const fetchPosts = (threadId) => async (dispatch: AppDispatch) => {
    dispatch(postsLoad());
    const posts = await userApi.fetchPosts(threadId); // id  threadId
    dispatch(postsDone(posts));
};

export default postsSlice.reducer;