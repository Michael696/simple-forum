import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {CaseReducer} from "@reduxjs/toolkit/dist/createReducer";
import {AppDispatch, RootState} from "../../app/store";
import {userApi} from "../../app/userApi";

// type ReducerWithoutAction = CaseReducer<OnlineUsersList>;
// type ReducerWithAction = CaseReducer<OnlineUsersList, PayloadAction<object[]>>;

export type RegisterParams = {
    name: string,
    eMail: string,
    password: string
};

export type RegisterState = {
    state: 'idle' | 'pending' | 'done' | 'error',
    error?: string
};

export type RegisterRequest = RegisterParams & RegisterState;

const initialState: RegisterRequest = {
    state: 'idle',
    error: '',
    name: '',
    eMail: '',
    password: ''
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart: (register, action: PayloadAction<RegisterParams>) => {
            console.log('registerStart action', action);
            if (register.state === 'idle') {
                register.state = 'pending';
                register.name = action.payload.name;
                register.eMail = action.payload.eMail;
                register.password = action.payload.password;
            }
        },
        registerDone: (register, action) => {
            if (register.state === 'pending') {
                register.state = 'done';
            }
        },
        registerError: (register, action) => {
            console.log('registerError action', action);
            if (register.state === 'pending') {
                register.state = 'error';
                register.error = action.payload;
            }
        },
        registerClear: (register, action) => {
            register.state = 'idle';
        }
    },
});

export const {registerStart, registerDone, registerError, registerClear} = registerSlice.actions;

export const registerState = (state: RootState) => state.register.state;
export const registerErrorMessage = (state: RootState) => state.register.error;

export const register = (params: RegisterParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const register = getState().register;
    if (register.state === 'idle') {
// @ts-ignore
        dispatch(registerStart());
        const result = await userApi.register(params);
        console.log('register result:', result);
        if (result) {
// @ts-ignore
            dispatch(registerDone());
        } else {
// @ts-ignore
            dispatch(registerError());
        }

    }
};

export default registerSlice.reducer;
