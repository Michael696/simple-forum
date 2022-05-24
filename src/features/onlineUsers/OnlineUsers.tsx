import React, {useEffect} from 'react';
import {fetchUsers, onlineUsers, onlineUsersLoading} from './onlineUsersSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import './OnlineUsers.sass';

export default function OnlineUsers() {
    const users = {
        online: useAppSelector(onlineUsers),
        state: useAppSelector(onlineUsersLoading)
    };
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div className='online-users margin1-top pad05'>
            <div>Total users online: {users.online.length}</div>
            <div>Users: {users.online.join(', ')}</div>
        </div>
    );
}