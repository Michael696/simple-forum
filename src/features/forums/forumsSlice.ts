import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {LoadingType} from "../../app/types";
import {CaseReducer} from "@reduxjs/toolkit/dist/createReducer";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";

type ForumMessageType = {
    lastMessage: string, // dateTime
    user: string
};

type ForumItemType = {
    name: string,
    description: string,
    themeCount: number,
    postCount: number,
    lastMessage: ForumMessageType
};

type InitialStateType = {
    list: Array<ForumItemType>,
    isLoading: LoadingType
}

const initialState: InitialStateType = {
    list: [],
    isLoading: 'idle'
};

type ReducerWithoutAction = CaseReducer<InitialStateType>;
type ReducerWithAction = CaseReducer<InitialStateType, PayloadAction<ForumItemType[]>>;

const _forumsLoad: ReducerWithoutAction = (state: InitialStateType) => {
    if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
    }
};

const _forumsDone: ReducerWithAction = (state: InitialStateType, action) => {
    if (state.isLoading === 'pending') {
        state.isLoading = 'idle';
        state.list = action.payload;
    }
};

export const forumSlice = createSlice({
    name: 'forums',
    initialState,
    reducers: {
        forumsLoad: _forumsLoad,
        forumsDone: _forumsDone

    },
});

export const forumsIsLoading = state => state.forums.isLoading;
export const forumsList = state => state.forums.list;

const {forumsLoad, forumsDone} = forumSlice.actions;

export const fetchForums = () => async (dispatch: AppDispatch) => {
    dispatch(forumsLoad());
    const forums = await userApi.fetchForums();
    dispatch(forumsDone(forums));
};

export default forumSlice.reducer;