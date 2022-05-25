import React, {useEffect} from 'react';
import {fetchUsers, onlineUsers} from './onlineUsersSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import './OnlineUsers.sass';

export default function OnlineUsers() {
    const usersOnline = useAppSelector(onlineUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div className='online-users margin1-top pad05'>
            <div>Total users online: {usersOnline ? usersOnline.length : '0'}</div>
            <div>Users: {usersOnline ? usersOnline.join(', ') : ''}</div>
        </div>
    );
}