import {createSlice} from '@reduxjs/toolkit';
import {Id, LoadingType, User} from "../../app/types";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {AppDispatch} from "../../app/store";
import {userApi} from "../../app/userApi";

type InitialStateType = User & {
    isAuthPending: LoadingType;
    error: string;
};

const initialState: InitialStateType = {
    realName: "",
    error: "",
    isAuthPending: 'idle',
    id: '',
    isAdmin: false,
    isBanned: false,
    location: "",
    name: "",
    posts: 0,
    registeredAt: 0
};

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        authReq: (state: InitialStateType) => {
            if (state.isAuthPending === 'idle' || state.isAuthPending === 'error') {
                state.isAuthPending = 'pending';
            }
        },
        authDone: (state: InitialStateType, action: PayloadAction<User>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'idle';
                state.error = '';
                const user = action.payload;
                Object.keys(user).forEach(key => {
                    state[key] = user[key];
                })
            }
        },
        authError: (state: InitialStateType, action: PayloadAction<string>) => {
            if (state.isAuthPending === 'pending') {
                state.isAuthPending = 'error';
                state.error = action.payload;
            }
        },
        authClear: (state: InitialStateType) => {
            if (state.isAuthPending === 'idle' || state.isAuthPending === 'error') {
                Object.keys(initialState).forEach(key => {
                    state[key] = initialState[key];
                });
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
