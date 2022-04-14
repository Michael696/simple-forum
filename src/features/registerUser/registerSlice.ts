import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {CaseReducer} from "@reduxjs/toolkit/dist/createReducer";
import {AppDispatch, RootState} from "../../app/store";
import {userApi} from "../../app/userApi";

// type ReducerWithoutAction = CaseReducer<OnlineUsersList>;
// type ReducerWithAction = CaseReducer<OnlineUsersList, PayloadAction<object[]>>;

type RegisterState = { state: 'idle' | 'pending' | 'done' | 'error' };
// type RegisterReducer = CaseReducer<RegisterState, PayloadAction>;

const initialState: RegisterState = {state: 'idle'};

export type RegisterParams = {
    name: string,
    eMail: string,
    password: string
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart: (register, action) => {
            if (register.state === 'idle') {
                register.state = 'pending';
            }
        },
        registerDone: (register, action) => {
            if (register.state === 'pending') {
                register.state = 'done';
            }
        },
        registerError: (register, action) => {
            if (register.state === 'pending') {
                register.state = 'error';
            }
        },
        registerClear: (register, action) => {
            register.state = 'idle';
        }
    },
});

export const {registerStart, registerDone, registerError, registerClear} = registerSlice.actions;

export const registerState = state => state.register.state;

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
