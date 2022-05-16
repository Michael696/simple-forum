import React from 'react';

export default function CurrentUser({name, isAdmin, isBanned}: { name: string, isAdmin: boolean, isBanned: boolean }) {
    let msg = `You are logged in as: ${name}`;
    if (isAdmin) {
        msg += ` (admin)`;
    }
    if (isBanned) {
        msg += ` (banned)`;
    }
    return (<div className='current-user'>{msg}</div>);
}