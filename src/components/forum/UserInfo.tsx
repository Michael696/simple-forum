import React from 'react';
import {User} from "../../app/types";

export default function UserInfo({user}: { user: User }) {
    return (
        <div className='user-info'>
            {JSON.stringify(user)}
        </div>
    );
}