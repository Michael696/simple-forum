import React from 'react';

export default function CurrentUser({name}: { name: string }) {
    return (<div className='current-user'>You are logged in as: {name}</div>);
}