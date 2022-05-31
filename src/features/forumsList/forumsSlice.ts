import {isValid as isValidDate} from 'date-fns'
import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {ForumItemType, ForumsStateType, Id} from "../../app/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {FETCH_PERIOD} from "../../app/settings";

const initialState: ForumsStateType = {
    list: [],
    lastFetch: '',
    lastError: '',
    isLoading: 'idle'
};

export const forumSlice = createSlice({
    name: 'forums',
    initialState,
    reducers: {
        forumsLoad: (state: ForumsStateType) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.lastError = '';
                state.lastFetch = new Date().toISOString();
            }
        },
        forumsDone: (state: ForumsStateType, action: PayloadAction<ForumItemType[]>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.lastError = '';
                state.list = action.payload;
            }
        },
        forumsError: (state: ForumsStateType, action: PayloadAction<{ error: string }>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.lastError = action.payload.error;
            }
        }
    },
});

export const forumsIsLoading = state => state.forums.isLoading;
export const forumsList = state => state.forums.list;
export const forumWithId = (state, id: Id) => state.forums.list.find(forum => forum.id === id);
export const forumsLastError = state => state.forums.lastError;

const {forumsLoad, forumsDone, forumsError} = forumSlice.actions;

export const fetchForums = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const forumsSlice = getState().forums;
    const lastFetch = new Date(forumsSlice.lastFetch);
    if ((!isValidDate(lastFetch) || Date.now().valueOf() - lastFetch.valueOf() > FETCH_PERIOD
        || forumsSlice.list.length === 0)
        && forumsSlice.isLoading === 'idle') {

        console.log('fetch forums');
        dispatch(forumsLoad());
        const forums = await userApi.fetchForums();
        if (forums.error) {
            dispatch(forumsError({error: forums.error}));
        } else {
            dispatch(forumsDone(forums));
        }
    } else {
        console.log('fetch forums skipped');
    }
};

export default forumSlice.reducer;