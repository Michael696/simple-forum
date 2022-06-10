import {createSlice} from '@reduxjs/toolkit';
import {CurrentUserType, Id, User} from "../../app/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {AppDispatch, RootState} from "../../app/store";
import {userApi} from "../../app/userApi";
import {debug} from "../../app/debug";

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
                debug('authReq - IS PENDING');
            }
        },
        authDone: (state: CurrentUserType, action: PayloadAction<User>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'idle';
                state.error = '';
                state.data = action.payload;
            } else {
                debug('authDone - IS PENDING');
            }
        },
        authError: (state: CurrentUserType, action: PayloadAction<string>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'idle';
                state.data = emptyUser();
                state.error = action.payload;
            } else {
                debug('authError - IS PENDING');
            }
        },
        authClear: (state: CurrentUserType) => {
            if (state.isAuthPending === 'idle') {
                state.data = emptyUser();
            } else {
                debug('authClear - IS PENDING');
            }
        },
    },
});

export const findUserById = (list: Array<User>, id: Id) => list.filter(user => user.id === id)[0];

export const {authReq, authDone, authError, authClear} = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.data;

export const selectLastAuthError = (state: RootState) => state.currentUser.error;

export const selectIsUserAuthenticated = (state: RootState) => state.currentUser.data.name.length > 0 && state.currentUser.error.length === 0;

export const authenticate = ({name, password}: { name: string, password: string }) => async (dispatch: AppDispatch) => {
    let authResult;
    dispatch(authReq());
    try {
        authResult = await userApi.auth({name, password});
        if (authResult && authResult.error) {
            dispatch(authError(authResult.error));
        } else {
            dispatch(authDone(authResult));
        }
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
        debug('deauth error:', e);
    }
};

export default currentUserSlice.reducer;
