import React from 'react';
import {useSelector} from 'react-redux';

import {
    onlineUsers,
} from './onlineUsersSlice';

export default function OnlineUsers() {
    const users = useSelector(onlineUsers);

    return (<div className='online-users'>
        Users online: {users.length} (who?)
    </div>);
}