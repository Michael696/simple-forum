import React, {useEffect} from 'react';
import {fetchUsers, selectOnlineUsers} from './onlineUsersSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import './OnlineUsers.sass';

export default function OnlineUsers() {
    const usersOnline = useAppSelector(selectOnlineUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    });

    return (
        <div className='online-users margin1-top pad05 margin05'>
            <div>Total users online: {usersOnline ? usersOnline.length : '0'}</div>
            <div>Users: {usersOnline ? usersOnline.join(', ') : ''}</div>
        </div>
    );
}