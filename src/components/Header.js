import React from 'react';
import Logo from './Logo';
import LanguageSelector from '../features/languageSelector/LanguageSelector';
import OnlineUsers from '../features/onlineUsers/OnlineUsers';
import DeAuth from '../features/currentUser/DeAuth';
import {useSelector} from 'react-redux';

import {
    currentUser,
} from '../features/currentUser/currentUserSlice';
import CurrentUser from '../features/currentUser/CurrentUser';

export default function Header() {
    const user = useSelector(currentUser);
    console.log('current user:', user);

    return (<div className='main-header'>
        <Logo/>
        <div>Header</div>
        <LanguageSelector/>
        <OnlineUsers/>
        {user.name && <><CurrentUser name={user.name}/> <DeAuth/> </>}

    </div>);
}