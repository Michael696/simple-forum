import { createSlice } from '@reduxjs/toolkit';

export const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState: {
        list: [],
    },
    reducers: {
        set: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { set } = onlineUsersSlice.actions;

export const onlineUsers = state => state.onlineUsers.list;

export default onlineUsersSlice.reducer;
