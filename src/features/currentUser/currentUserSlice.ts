import {createSlice} from '@reduxjs/toolkit';
import {CurrentUserType, Id, User} from "../../app/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {AppDispatch, RootState} from "../../app/store";
import {userApi} from "../../app/userApi";

const emptyUser = () => {
    return {
        id: '',
        name: '',
        realName: '',
        registeredAt: '',
        posts: 0,
        location: '',
        isBanned: false,
        isAdmin: false,
    };
};

const initialState: CurrentUserType = {
    data: emptyUser(),
    isAuthPending: 'idle',
    error: ''
};

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        authReq: (state: CurrentUserType) => {
            if (state.isAuthPending === 'idle') {
                state.isAuthPending = 'pending';
            } else {
                console.log('authReq - IS PENDING');
            }
        },
        authDone: (state: CurrentUserType, action: PayloadAction<User>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'idle';
                state.error = '';
                state.data = action.payload;
            } else {
                console.log('authDone - IS PENDING');
            }
        },
        authError: (state: CurrentUserType, action: PayloadAction<string>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'idle';
                state.data = emptyUser();
                state.error = action.payload;
            } else {
                console.log('authError - IS PENDING');
            }
        },
        authClear: (state: CurrentUserType) => {
            if (state.isAuthPending === 'idle') {
                state.data = emptyUser();
            } else {
                console.log('authClear - IS PENDING');
            }
        },
    },
});

export const findUserById = (list: Array<User>, id: Id) => list.filter(user => user.id === id)[0];

export const {authReq, authDone, authError, authClear} = currentUserSlice.actions;

export const currentUser = (state: RootState) => state.currentUser.data;

export const lastAuthError = (state: RootState) => state.currentUser.error;

export const isUserAuthenticated = (state: RootState) => state.currentUser.data.name.length > 0 && state.currentUser.error.length === 0;

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
        dispatch(authError(''));
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
