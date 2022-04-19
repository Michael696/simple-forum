import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, LoadingType, ThreadItemType} from "../../app/types";

type InitialStateType = {
    list: Array<ThreadItemType>,
    forumId: Id,
    isLoading: LoadingType
}

const initialState: InitialStateType = {
    list: [],
    forumId: '',
    isLoading: 'idle'
};

export const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        threadsLoad: (state: InitialStateType, action: PayloadAction<Id>) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.list = [];
                state.forumId = action.payload;
            }
        },
        threadsDone: (state: InitialStateType, action: PayloadAction<ThreadItemType[]>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.list = action.payload;
            }
        }
    },
});

export const threadsIsLoading = state => state.threasd.isLoading;
export const threadsList = state => state.threads.list;
export const threadWithId = (state, id: Id) => state.threads.list.filter(thread => thread.id === id)[0];

const {threadsLoad, threadsDone} = threadsSlice.actions;

export const fetchThreads = (id) => async (dispatch: AppDispatch) => {
    dispatch(threadsLoad(id));
    const threads = await userApi.fetchThreads(id);
    dispatch(threadsDone(threads));
};

export default threadsSlice.reducer;