import {isValid as isValidDate} from 'date-fns'
import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from "../../app/store";
import {ForumItemType, Id, LoadingType} from "../../app/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {FETCH_PERIOD} from "../../app/settings";

type InitialStateType = {
    list: Array<ForumItemType>,
    lastFetch: string,
    isLoading: LoadingType
}

const initialState: InitialStateType = {
    list: [],
    lastFetch: '',
    isLoading: 'idle'
};

export const forumSlice = createSlice({
    name: 'forums',
    initialState,
    reducers: {
        forumsLoad: (state: InitialStateType) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.lastFetch = new Date().toISOString();
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

export const fetchForums = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const forumsSlice = getState().forums;
    const now = new Date();
    const lastFetch = new Date(forumsSlice.lastFetch);
    //@ts-ignore
    if (!isValidDate(lastFetch) || forumsSlice.list.length === 0 || now - lastFetch > FETCH_PERIOD) {
        console.log('fetch forums');
        dispatch(forumsLoad());
        const forums = await userApi.fetchForums();
        dispatch(forumsDone(forums));
    } else {
        console.log('fetch forums skipped');
    }
};

export default forumSlice.reducer;