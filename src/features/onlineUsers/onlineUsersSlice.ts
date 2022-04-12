import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {CaseReducer} from "@reduxjs/toolkit/dist/createReducer";
import {userApi} from "../../app/userApi";
import {AppDispatch, RootState} from "../../app/store";

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

// export const {set} = onlineUsersSlice.actions;
// export const onlineUsers = state => state.onlineUsers.list;

export const onlineUsersLoading = state => state.onlineUsers.loading;
const {usersLoading, usersDone} = onlineUsersSlice.actions;

export const fetchUsers = () => async (dispatch) => {
    dispatch(usersLoading());
    const users = await userApi.fetchOnline();
    dispatch(usersDone(users))
};

export default onlineUsersSlice.reducer;
