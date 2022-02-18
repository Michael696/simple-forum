import React from 'react';
import {useSelector} from 'react-redux';
import {baseApi} from '../../app/onlineUsersApi';

import {
    onlineUsers,
} from './onlineUsersSlice';

export default function OnlineUsers() {
    const users = useSelector(onlineUsers);
    const {data, isLoading} = baseApi.useOnlineUsersQuery();

    return (<div className='online-users'>
        Users online: {users.length} (who?)
        <br/>
        data:{data} isLoading:{isLoading.toString()}
    </div>);
}