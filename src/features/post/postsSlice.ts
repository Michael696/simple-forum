import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, LoadingType, PostItemType} from "../../app/types";

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
        }
    },
});

export const postsIsLoading = state => state.posts.isLoading;
export const postsList = state => state.posts.list;
export const postWithId = (state, id: Id) => state.posts.list.filter(post => post.id === id)[0];

const {postsLoad, postsDone} = postsSlice.actions;

export const fetchPosts = (threadId) => async (dispatch: AppDispatch) => {
    dispatch(postsLoad());
    const posts = await userApi.fetchPosts(threadId); // id  threadId
    dispatch(postsDone(posts));
};

export default postsSlice.reducer;