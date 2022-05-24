import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, ThreadItemType, ThreadsStateType} from "../../app/types";

const initialState: ThreadsStateType = {
    list: [],
    forumId: '',
    isLoading: 'idle'
};

const findThreadById = (threads, id: Id): ThreadItemType => threads.find(thread => thread.id === id);

export const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        threadsLoad: (state: ThreadsStateType, action: PayloadAction<Id>) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.list = [];
                state.forumId = action.payload;
            }
        },
        threadsDone: (state: ThreadsStateType, action: PayloadAction<ThreadItemType[]>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.list = action.payload;
            }
        },
        viewed: (state: ThreadsStateType, action: PayloadAction<Id>) => {
            const thread = findThreadById(state.list, action.payload);
            if (thread) {
                console.log('addViewCount for', action.payload);
                thread.viewCount++;
            }
        },
        threadRemove: (state: ThreadsStateType, action: PayloadAction<{ id: Id }>) => {
            state.list = state.list.filter(thread => thread.id !== action.payload.id);
        },
    },
});

export const threadsIsLoading = state => state.threads.isLoading;
export const threadsList = state => state.threads.list;
export const threadWithId = (state, id: Id) => findThreadById(state.threads.list, id);

const {threadsLoad, threadsDone, threadRemove} = threadsSlice.actions;
export const {viewed} = threadsSlice.actions;

export const fetchThreads = (id) => async (dispatch: AppDispatch) => {
    console.log('fetch threads', id);
    dispatch(threadsLoad(id));
    const threads = await userApi.fetchThreads(id);
    dispatch(threadsDone(threads));
};

export const removeThread = (id) => async (dispatch: AppDispatch) => {
    const result = await userApi.removeThread(id);
    if (!!result && !result.error) {
        dispatch(threadRemove({id}));
    } else {
        console.log(`cannot remove thread ${id}: server error`);
    }
};

export const addThreadViewCount = (threadId) => async () => {
    // console.log('addThreadViewCount', threadId);
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