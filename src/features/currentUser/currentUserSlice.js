import {createSlice} from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        name: '',
        id: '',
    },
    reducers: {
        auth: (state, {payload: {name, id}}) => {
            state.name = name;
            state.id = id;
        },
        deAuth: (state) => {
            state.name = '';
            state.id = '';
        },
    },
});

export const {auth, deAuth} = currentUserSlice.actions;

export const currentUser = state => state.currentUser;

export default currentUserSlice.reducer;
