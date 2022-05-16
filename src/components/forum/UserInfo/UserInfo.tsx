import React from 'react';
import {User} from "../../../app/types";
import './UserInfo.sass';

const UserInfo = function ({user}: { user: User }) {
    return (
        <div className='user-info pad05'>
            <div>{user.name}</div>
            <div>{user.isAdmin ? 'admin' : 'regular'}</div>
            {user.isBanned && <div>banned</div>}
            <div>{`messages:${user.posts}`}</div>
            <div>{`registered:${user.registeredAt}`}</div>
            <div>{`location:${user.location}`}</div>
        </div>
    );
};

export default React.memo(UserInfo);