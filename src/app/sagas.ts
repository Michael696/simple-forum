import {all, fork} from 'redux-saga/effects'
import registerFlow from "../features/registerUser/registerSaga";

export default function* rootSaga() {
    yield all([
// @ts-ignore
        fork(registerFlow)
    ])
}