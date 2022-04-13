import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {CaseReducer} from "@reduxjs/toolkit/dist/createReducer";
import {userApi} from "../../app/userApi";
import {AppDispatch} from "../../app/store";
import {useSelector} from "react-redux";

interface OnlineUsersList {
    loading: 'idle' | 'pending' | 'error',
    users: Array<object | string>
}

const initialState: OnlineUsersList = {
    loading: 'idle',
    users: []
};

type ReducerWithoutAction = CaseReducer<OnlineUsersList>;
type ReducerWithAction = CaseReducer<OnlineUsersList, PayloadAction<object[]>>;

const usersLoadingF: ReducerWithoutAction = (state) => {
    if (state.loading === 'idle') {
        state.loading = 'pending';
    }
};

const usersDoneF: ReducerWithAction = (state, action) => {
    if (state.loading === 'pending') {
        state.loading = 'idle';
        state.users = action.payload;
    }
};

export const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        usersLoading: usersLoadingF,
        usersDone: usersDoneF,
    },
});

export const onlineUsersLoading = state => state.onlineUsers.loading;
export const onlineUsers = state => state.onlineUsers.users;

const {usersLoading, usersDone} = onlineUsersSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(usersLoading());
    const users = await userApi.fetchOnline();
    dispatch(usersDone(users))
};

// export const useFetchUsers = () => [fetchUsers, {online: useSelector(onlineUsers), isLoading: useSelector(onlineUsersLoading)}];

export default onlineUsersSlice.reducer;
