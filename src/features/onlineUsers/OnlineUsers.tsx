import React, {useEffect} from 'react';
import {fetchUsers, onlineUsers, onlineUsersLoading} from './onlineUsersSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export default function OnlineUsers() {
    // const isLoading = useSelector(onlineUsersLoading);
    // const users = useSelector(onlineUsers);
    const users = {
        online: useAppSelector(onlineUsers),
        state: useAppSelector(onlineUsersLoading)
    };
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (<div className='online-users'>
        Users online: {users.online.length} ({JSON.stringify(users)})
    </div>);
}