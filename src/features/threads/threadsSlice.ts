import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {Id, ThreadItemType, ThreadsStateType} from "../../app/types";
import {isValid as isValidDate} from "date-fns";
import {FETCH_PERIOD} from "../../app/settings";
import {debug} from "../../app/debug";

const initialState: ThreadsStateType = {
    list: [],
    forumId: '',
    lastFetch: '',
    lastError: '',
    isLoading: 'idle'
};

const findThreadById = (threads: Array<ThreadItemType>, id: Id): ThreadItemType | undefined => threads && threads.find(thread => thread.id === id);

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
                debug('addViewCount for', action.payload);
                thread.viewCount++;
            }
        },
        threadRemove: (state: ThreadsStateType, action: PayloadAction<{ id: Id }>) => {
            state.list = state.list.filter(thread => thread.id !== action.payload.id);
        },
    },
});

export const selectThreadsIsLoading = (state: RootState) => state.threads.isLoading;
export const selectThreads = (state: RootState) => state.threads.list;
export const selectThreadWithId = (state: RootState, id: Id) => findThreadById(state.threads.list, id);
export const selectThreadLastError = (state: RootState) => state.threads.lastError;

const {threadsLoad, threadsDone, threadRemove, threadsError} = threadsSlice.actions;
export const {viewed} = threadsSlice.actions;

export const fetchThreads = (forumId: Id, force: boolean = false) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const threadsSlice = getState().threads;
    const lastFetch = new Date(threadsSlice.lastFetch);
    if (force || ((!isValidDate(lastFetch) || Date.now().valueOf() - lastFetch.valueOf() > FETCH_PERIOD
        || forumId !== threadsSlice.forumId
        || threadsSlice.list.length === 0)
        && threadsSlice.isLoading === 'idle')) {

        debug('fetch threads', forumId);
        dispatch(threadsLoad(forumId));
        const threads = await userApi.fetchThreads(forumId);
        if (threads) {
            dispatch(threadsDone(threads));
        } else {
            dispatch(threadsError({error: 'network error'}));
        }
    } else {
        debug('fetch threads skipped', forumId);
    }
};

export const removeThread = (id: string | undefined) => async (dispatch: AppDispatch) => {
    if (id) {
        const result = await userApi.removeThread(id);
        if (!!result && !result.error) {
            dispatch(threadRemove({id}));
        } else {
            debug(`cannot remove thread ${id}: server error`);
        }
    }
};

export const addThreadViewCount = (threadId: Id) => async () => {
    // console.log('addThreadViewCount', threadId);
    await userApi.addThreadViewCount(threadId);
};

export default threadsSlice.reducer;