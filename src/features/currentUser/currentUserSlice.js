import {createSlice} from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        name: '',
        id: '',
    },
    reducers: {
        auth: (state, action) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
        deAuth: (state) => {
            state.name = '';
            state.id = '';
        },
    },
});

export const {set} = currentUserSlice.actions;

export const currentUser = state => state.currentUser;

export default currentUserSlice.reducer;
