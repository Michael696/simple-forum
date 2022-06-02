import React from 'react';
import {User} from "../../app/types";
import './CurrentUser.sass';

export default function CurrentUser({user}: { user: User }) {
    let msg = '';
    if (user.name) {
        msg = user.name;
        if (user.isAdmin) {
            msg += ' (admin)';
        }
        if (user.isBanned) {
            msg += ' (banned)';
        }
    }
    return (
        msg ? (
            <div className='current-user margin1-right'>
                You are logged in as: <span className='bold margin1-left'>{msg}</span>
            </div>
        ) : null
    );
}