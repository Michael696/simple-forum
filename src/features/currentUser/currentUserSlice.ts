import {createSlice} from '@reduxjs/toolkit';
import {CurrentUserType, Id, User} from "../../app/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {AppDispatch} from "../../app/store";
import {userApi} from "../../app/userApi";

const initialState: CurrentUserType = {
    realName: "",
    error: "",
    isAuthPending: 'idle',
    id: '',
    isAdmin: false,
    isBanned: false,
    location: "",
    name: "",
    posts: 0,
    registeredAt: ''
};

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        authReq: (state: CurrentUserType) => {
            if (state.isAuthPending === 'idle' || state.isAuthPending === 'error') {
                state.isAuthPending = 'pending';
            }
        },
        authDone: (state: CurrentUserType, action: PayloadAction<User>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'idle';
                state.error = '';
                const user = action.payload;
                Object.keys(user).forEach(key => {
                    state[key] = user[key];
                })
            }
        },
        authError: (state: CurrentUserType, action: PayloadAction<string>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'error';
                state.error = action.payload;
            }
        },
        authClear: (state: CurrentUserType) => {
            if (state.isAuthPending === 'idle' || state.isAuthPending === 'error') {
                Object.keys(initialState).forEach(key => {
                    state[key] = initialState[key];
                });
            } else {
                console.log('auth IS PENDING');
            }
        },
    },
});

export const findUserById = (list: Array<User>, id: Id) => list.filter(user => user.id === id)[0];

export const {authReq, authDone, authError, authClear} = currentUserSlice.actions;

export const currentUser = state => state.currentUser;

export const isUserAuthenticated = state => (state.currentUser.name.length > 0 && state.currentUser.error.length === 0);

export const authenticate = ({name, password}) => async (dispatch: AppDispatch) => {
    let authResult;
    dispatch(authReq());
    try {
        authResult = await userApi.auth({name, password});
        dispatch(authDone(authResult));
    } catch (e: any) {
        dispatch(authError(e.message || 'unknown error'));
    }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
    let checkResult;
    dispatch(authReq());
    try {
        checkResult = await userApi.currentUser();
        dispatch(authDone(checkResult));
    } catch (e: any) {
        dispatch(authError(e.message || 'unknown error'));
    }
};

export const deAuthenticate = () => async (dispatch: AppDispatch) => {
    try {
        await userApi.deAuth();
        dispatch(authClear());
    } catch (e: any) {
        console.log('deauth error:', e);
    }
};

export default currentUserSlice.reducer;
