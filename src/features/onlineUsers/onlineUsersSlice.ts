import {isValid as isValidDate} from 'date-fns'
import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {AppDispatch, RootState} from "../../app/store";
import {LoadingType} from '../../app/types';
import {FETCH_PERIOD} from "../../app/settings";

type OnlineUsersArray = Array<string>;

type OnlineUsersList = {
    users: OnlineUsersArray,
    loading: LoadingType,
    lastFetch: string,
}

const initialState: OnlineUsersList = {
    users: [],
    loading: 'idle',
    lastFetch: ''
};

export const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        usersLoading: (state: OnlineUsersList) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
                state.lastFetch = new Date().toISOString();
            }
        },
        usersDone: (state: OnlineUsersList, action: PayloadAction<OnlineUsersArray>) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.users = action.payload;
            }
        },
    },
});

export const onlineUsersLoading = state => state.onlineUsers.loading;
export const onlineUsers = state => state.onlineUsers.users;

const {usersLoading, usersDone} = onlineUsersSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const usersSlice = getState().forums;
    const now = new Date();
    const lastFetch = new Date(usersSlice.lastFetch);

    //@ts-ignore
    if ((!isValidDate(lastFetch) || now - lastFetch > FETCH_PERIOD) // TODO subtract dates nicer?
        && usersSlice.isLoading === 'idle') {

        dispatch(usersLoading());
        const users: OnlineUsersArray = await userApi.fetchOnline();
        if (users) {
            dispatch(usersDone(users))
        } else {
            dispatch(usersDone([]));
        }
    } else {
        console.log('fetch onilne-users skipped');
    }
};

export default onlineUsersSlice.reducer;
