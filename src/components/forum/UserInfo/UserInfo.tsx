import React from 'react';
import {User} from "../../../app/types";
import './UserInfo.sass';

const UserInfo = function ({user}: { user: User }) {
    return (
        <div className='user-info pad05'>
            <div className='bold center'>{user.name}</div>
            <div className='center'>
                {user.isAdmin ? 'admin' : 'regular'}
                <span className='margin1-left'/>
                {user.isBanned && <span className='center error-message'>(banned)</span>}
            </div>
            <div><span className='bold'>messages: </span>{user.posts}</div>
            <div><span className='bold'>registered: </span>{user.registeredAt}</div>
            <div><span className='bold'>location: </span>{user.location}</div>
        </div>
    );
};

export default React.memo(UserInfo);