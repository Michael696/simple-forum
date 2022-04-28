import React from 'react';
import Logo from '../Logo/Logo';
import LanguageSelector from '../../../features/languageSelector/LanguageSelector';
import OnlineUsers from '../../../features/onlineUsers/OnlineUsers';
import {useSelector} from 'react-redux';
import {
    currentUser,
} from '../../../features/currentUser/currentUserSlice';
import CurrentUser from '../../../features/currentUser/CurrentUser';
import './Header.sass';

export default function Header() {
    const user = useSelector(currentUser);

    return (<div className='header'>
        <Logo/>
        {/*<LanguageSelector/>*/}
        <OnlineUsers/>
        {user.name.length ? <CurrentUser name={user.name}/> : ''}
    </div>);
}