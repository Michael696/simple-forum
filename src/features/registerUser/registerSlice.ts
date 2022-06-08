import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {AppDispatch, RootState} from "../../app/store";
import {userApi} from "../../app/userApi";

export type RegisterParams = {
    name: string,
    realName: string,
    location: string,
    eMail: string,
    password: string
};

export type RegisterState = {
    state: 'idle' | 'pending' | 'done' | 'error',
    error: string
};


const initialState: RegisterState = {
    state: 'idle',
    error: '',
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart: (state: RegisterState) => {
            if (state.state === 'idle') {
                state.state = 'pending';
            }
        },
        registerDone: (state: RegisterState) => {
            if (state.state === 'pending') {
                state.state = 'done';
            }
        },
        registerError: (state: RegisterState, action: PayloadAction<string>) => {
            console.log('registerError action', action);
            if (state.state === 'pending') {
                state.state = 'error';
                state.error = action.payload;
            }
        },
        registerClear: (register: RegisterState) => {
            register.state = 'idle';
            register.error = '';
        }
    },
});

export const {registerStart, registerDone, registerError, registerClear} = registerSlice.actions;

export const selectRegisterState = (state: RootState) => state.register.state;
export const selectRegisterErrorMessage = (state: RootState) => state.register.error;

export const register = (params: RegisterParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const register = getState().register;
    if (register.state === 'idle') {
        dispatch(registerStart());
        const result = await userApi.register(params);
        if (result) {
            if (!result.error) {
                dispatch(registerDone());
            } else {
                dispatch(registerError(result.error));
            }
        } else {
            dispatch(registerError('unknown error'));
        }
    }
};

export default registerSlice.reducer;
