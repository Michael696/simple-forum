import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {deAuthenticate} from './currentUserSlice';
import {AppDispatch} from "../../app/store";
import {fetchUsers} from "../onlineUsers/onlineUsersSlice";
import './CurrentUser.sass'

export default function DeAuth() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(deAuthenticate());
        dispatch(fetchUsers());
    }, []);

    return (
        <h6 className='sign-out-message'>
            You have signed out !
        </h6>
    );
}