import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {userApi} from "../../app/userApi";
import {AppDispatch} from "../../app/store";
import {LoadingType} from '../../app/types';

type OnlineUsersArray = Array<string>;

type OnlineUsersList = {
    loading: LoadingType
    users: OnlineUsersArray
}

const initialState: OnlineUsersList = {
    loading: 'idle',
    users: []
};

export const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        usersLoading: (state: OnlineUsersList) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
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

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(usersLoading());
    const users: OnlineUsersArray = await userApi.fetchOnline();
    if (users) {
        dispatch(usersDone(users))
    } else {
        dispatch(usersDone([]));
    }
};

export default onlineUsersSlice.reducer;
