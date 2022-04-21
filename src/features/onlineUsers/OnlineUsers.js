import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers, onlineUsers, onlineUsersLoading} from './onlineUsersSlice';

export default function OnlineUsers() {
    // const isLoading = useSelector(onlineUsersLoading);
    // const users = useSelector(onlineUsers);
    const users = {
        online: useSelector(onlineUsers),
        state: useSelector(onlineUsersLoading)
    };
    const fetch = fetchUsers();
    // const [fetch, users] = useFetchUsers();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetch);
    }, []);

    return (<div className='online-users'>
        Users online: {users.online.length} ({JSON.stringify(users)})
    </div>);
}