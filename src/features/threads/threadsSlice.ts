import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "../../app/store";
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

const findThreadById = (threads, id: Id): ThreadItemType => threads.find(thread => thread.id === id);

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
        },
        viewed: (state: InitialStateType, action: PayloadAction<Id>) => {
            const thread = findThreadById(state.list, action.payload);
            if (thread) {
                console.log('addViewCount for', action.payload);
                thread.viewCount++;
            }
        }
    },
});

export const threadsIsLoading = state => state.threads.isLoading;
export const threadsList = state => state.threads.list;
export const threadWithId = (state, id: Id) => findThreadById(state.threads.list, id);

const {threadsLoad, threadsDone} = threadsSlice.actions;
export const {viewed} = threadsSlice.actions;

export const fetchThreads = (id) => async (dispatch: AppDispatch) => {
    console.log('fetchThreads', id);
    dispatch(threadsLoad(id));
    const threads = await userApi.fetchThreads(id);
    dispatch(threadsDone(threads));
};

export const addThreadViewCount = (threadId) => async () => {
    console.log('addThreadViewCount', threadId);
    await userApi.addThreadViewCount(threadId);
};

/*
export const fetchThreadsAndView = (forumId, threadId) => async (dispatch: AppDispatch) => {
    console.log('fetchThreadsAndView', forumId, threadId);
    await dispatch(fetchThreads(forumId));
    await dispatch(addThreadViewCount(threadId));
    await dispatch(viewed(threadId));
};
*/

export default threadsSlice.reducer;