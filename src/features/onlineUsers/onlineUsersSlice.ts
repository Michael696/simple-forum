import {isValid as isValidDate} from 'date-fns'
import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {AppDispatch, RootState} from "../../app/store";
import {LoadingType, MiddlewareExtraArgument} from '../../app/types';
import {FETCH_PERIOD} from "../../app/settings";
import {debug} from "../../app/helpers";

type OnlineUsersArray = Array<string>;

type OnlineUsersList = {
    users: OnlineUsersArray,
    isLoading: LoadingType,
    lastFetch: string,
}

const initialState: OnlineUsersList = {
    users: [],
    isLoading: 'idle',
    lastFetch: ''
};

export const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        usersLoading: (state: OnlineUsersList) => {
            if (state.isLoading === 'idle') {
                state.isLoading = 'pending';
                state.lastFetch = new Date().toISOString();
            }
        },
        usersDone: (state: OnlineUsersList, action: PayloadAction<OnlineUsersArray>) => {
            if (state.isLoading === 'pending') {
                state.isLoading = 'idle';
                state.users = action.payload;
            }
        },
    },
});

export const onlineUsersLoading = (state: RootState) => state.onlineUsers.isLoading;
export const selectOnlineUsers = (state: RootState) => state.onlineUsers.users;

const {usersLoading, usersDone} = onlineUsersSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch, getState: () => RootState, extraArgument: MiddlewareExtraArgument) => {
    const {userApi} = extraArgument;
    const usersSlice = getState().onlineUsers;
    const lastFetch = new Date(usersSlice.lastFetch);

    if ((!isValidDate(lastFetch) || Date.now().valueOf() - lastFetch.valueOf() > FETCH_PERIOD)
        && usersSlice.isLoading === 'idle') {

        dispatch(usersLoading());
        const users: OnlineUsersArray = await userApi.fetchOnline();
        if (users) {
            dispatch(usersDone(users))
        } else {
            dispatch(usersDone([]));
        }
    } else {
        debug('fetch onilne-users skipped');
    }
};

export default onlineUsersSlice.reducer;
