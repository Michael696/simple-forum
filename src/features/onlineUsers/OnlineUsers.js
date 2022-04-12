import React, {useEffect} from 'react';
// import {useSelector} from 'react-redux';
// import {onlineUsersApi} from '../../app/onlineUsersApi';
import {fetchUsers, onlineUsersLoading} from './onlineUsersSlice';
import {useDispatch, useSelector} from 'react-redux';

// import {
//     onlineUsers,
// } from './onlineUsersSlice';

export default function OnlineUsers() {
    // const users = useSelector(onlineUsers);
    // const {data, isLoading} = onlineUsersApi.useOnlineUsersQuery();
    const users=[],data=[];
    const isLoading=useSelector(onlineUsersLoading);
    // const isLoading = useSelector
    const fetch = fetchUsers();
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAsync = async () => await fetch(dispatch);
        const u = fetchAsync();
        console.log(u);

    },[]);

    return (<div className='online-users'>
        Users online: {users.length} (who?)
        <br/>
        data:{data} isLoading:{isLoading}
    </div>);
}