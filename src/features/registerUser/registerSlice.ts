import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
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
        registerStart: (state:RegisterRequest, action: PayloadAction<RegisterParams>) => {
            console.log('registerStart action', action);
            if (state.state === 'idle') {
                state.state = 'pending';
                state.name = action.payload.name;
                state.eMail = action.payload.eMail;
                state.password = action.payload.password;
            }
        },
        registerDone: (state:RegisterRequest) => {
            if (state.state === 'pending') {
                state.state = 'done';
            }
        },
        registerError: (state: RegisterRequest, action: PayloadAction<string>) => {
            console.log('registerError action', action);
            if (state.state === 'pending') {
                state.state = 'error';
                state.error = action.payload;
            }
        },
        registerClear: (register:RegisterRequest) => {
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
        dispatch(registerStart(params));
        const result = await userApi.register(params);
        console.log('register result:', result);
        if (result) {
            dispatch(registerDone());
        } else {
            dispatch(registerError('register error'));
        }
    }
};

export default registerSlice.reducer;
