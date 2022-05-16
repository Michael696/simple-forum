import React from 'react';
import Logo from '../Logo/Logo';
import OnlineUsers from '../../../features/onlineUsers/OnlineUsers';
import {currentUser,} from '../../../features/currentUser/currentUserSlice';
import CurrentUser from '../../../features/currentUser/CurrentUser';
import './Header.sass';
import {useAppSelector} from "../../../app/hooks";

export default function Header() {
    const user = useAppSelector(currentUser);

    return (<div className='header'>
        <Logo/>
        {/*<LanguageSelector/>*/}
        <OnlineUsers/>
        {user.name.length ? <CurrentUser name={user.name} isAdmin={user.isAdmin} isBanned={user.isBanned}/> : ''}
    </div>);
}