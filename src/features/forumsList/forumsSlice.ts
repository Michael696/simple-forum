import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "../../app/store";
import {Id, LastMessage, LoadingType} from "../../app/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";

type ForumItemType = {
    name: string,
    description: string,
    themeCount: number,
    postCount: number,
    lastMessage: LastMessage
};

type InitialStateType = {
    list: Array<ForumItemType>,
    isLoading: LoadingType
}

const initialState: InitialStateType = {
    list: [],
    isLoading: 'idle'
};

export const forumSlice = createSlice({
    name: 'forums',
    initialState,
    reducers: {
        forumsLoad: (state: InitialStateType) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
            }
        },
        forumsDone: (state: InitialStateType, action: PayloadAction<ForumItemType[]>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.list = action.payload;
            }
        }
    },
});

export const forumsIsLoading = state => state.forums.isLoading;
export const forumsList = state => state.forums.list;
export const forumWithId = (state, id: Id) => state.forums.list.find(forum => forum.id === id);

const {forumsLoad, forumsDone} = forumSlice.actions;

export const fetchForums = () => async (dispatch: AppDispatch) => {
    console.log('fetch forums');
    dispatch(forumsLoad());
    const forums = await userApi.fetchForums();
    dispatch(forumsDone(forums));
};

export default forumSlice.reducer;