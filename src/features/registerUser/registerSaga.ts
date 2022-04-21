import {takeLatest, put, call, take, fork, SagaReturnType} from 'redux-saga/effects'
import {userApi} from "../../app/userApi";
import {RegisterRequest, registerStart, registerError, registerDone, RegisterParams} from "./registerSlice";
import {ActionCreatorWithPayload, PayloadAction} from "@reduxjs/toolkit/dist/createAction";


function* watchRegister() {
    yield takeLatest(registerStart, register);
    // yield takeLatest('abc', register);
}

function* register(params: PayloadAction<RegisterParams>) {
    let result;
    try {
        // console.log('registerStart', registerStart);
        console.log('params', params);
        // yield put(registerStart);
        // const result: ReturnType<typeof userApi.register> = yield call(userApi.register, params.payload);
        result = yield call(userApi.register, params.payload);
        console.log('reg ok', result);
        yield put({type: registerDone.type});
    } catch (e:any) {
        // console.log('reg error', e);
        // const message = {error:'abc'};
        let error;
        if (typeof e === 'object') {
            error = e.message;
        } else {
            error = e;
        }
        yield put({type: registerError.type, payload: error});
    }
}

/*
function* register(params: PayloadAction<RegisterParams>) {
    try {
        const result = yield call(userApi.register, params.payload);
        console.log('result', result);
        if (result) {
            yield put({type: registerDone.type});
        } else {
            yield put({type: registerError.type});
        }
    } catch (e) {
        yield put({type: registerError.type});
    }
}
*/

export default function* registerFlow(params) { // перевезем в Камазе один мешок картошки
    /*
        while (true) {
            const request = yield take(registerStart);
            const task = yield fork(register, request)
            const action = yield take([registerDone.type, registerError.type])


        }
    */
    yield watchRegister();
}
