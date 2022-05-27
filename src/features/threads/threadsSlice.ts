import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, ThreadItemType, ThreadsStateType} from "../../app/types";
import {isValid as isValidDate} from "date-fns";
import {FETCH_PERIOD} from "../../app/settings";

const initialState: ThreadsStateType = {
    list: [],
    forumId: '',
    lastFetch: '',
    lastError: '',
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
                state.lastError = '';
                state.forumId = action.payload;
                state.lastFetch = new Date().toISOString();
            }
        },
        threadsDone: (state: ThreadsStateType, action: PayloadAction<ThreadItemType[]>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.list = action.payload;
            }
        },
        threadsError: (state: ThreadsStateType, action: PayloadAction<{ error: string }>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.lastError = action.payload.error;
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
export const threadLastError = state => state.threads.lastError;

const {threadsLoad, threadsDone, threadRemove, threadsError} = threadsSlice.actions;
export const {viewed} = threadsSlice.actions;

export const fetchThreads = (forumId) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const threadsSlice = getState().threads;
    const now = new Date();
    const lastFetch = new Date(threadsSlice.lastFetch);
    //@ts-ignore
    if ((!isValidDate(lastFetch) || now - lastFetch > FETCH_PERIOD // TODO subtract dates nicer?
        || forumId !== threadsSlice.forumId
        || threadsSlice.list.length === 0)
        && threadsSlice.isLoading === 'idle') {  // TODO investigate side effects

        console.log('fetch threads', forumId);
        dispatch(threadsLoad(forumId));
        const threads = await userApi.fetchThreads(forumId);
        if (threads) {
            dispatch(threadsDone(threads));
        } else { // TODO handle error
            dispatch(threadsError({error: 'network error'}));
        }
    } else {
        console.log('fetch threads skipped', forumId);
    }
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