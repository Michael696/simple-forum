import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {deAuthenticate} from './currentUserSlice';
import {AppDispatch} from "../../app/store";

export default function DeAuth() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(deAuthenticate());
    }, []);

    return (
        <div>
            You have signed out !
        </div>
    );
}