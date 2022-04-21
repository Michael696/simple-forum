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

    return (<div className='main-header'>
        <Logo/>
        {/*<LanguageSelector/>*/}
        <OnlineUsers/>
        {user.name.length ? <><CurrentUser name={user.name}/> <DeAuth/> </> : ''}
    </div>);
}