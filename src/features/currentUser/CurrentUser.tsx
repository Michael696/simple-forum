import React from 'react';
import {User} from "../../app/types";
import './CurrentUser.sass';

export default function CurrentUser({user}: { user: User }) {
    let msg = '';
    if (user.name) {
        msg = `You are logged in as: ${user.name}`;
        if (user.isAdmin) {
            msg += ` (admin)`;
        }
        if (user.isBanned) {
            msg += ` (banned)`;
        }
    } else {
        msg = 'You are a guest now';
    }
    return (<div className='current-user margin1-right'>{msg}</div>);
}