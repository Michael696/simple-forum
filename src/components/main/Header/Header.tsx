import React from 'react';
import Logo from '../Logo/Logo';
import './Header.sass';
import Navigation from "../Navigation/Navigation";
import CurrentTime from "../CurrentTime/CurrentTime";
import CurrentUser from "../../../features/currentUser/CurrentUser";
import {User} from "../../../app/types";
import {useAppSelector} from "../../../app/hooks";
import {currentUser} from "../../../features/currentUser/currentUserSlice";

export default function Header() {
    const user: User = useAppSelector(currentUser);

    return (<div className='header margin1-bottom'>
        <Logo/>
        <Navigation/>
        <CurrentTime/>
        <CurrentUser user={user}/>
{/*
            <LanguageSelector/>
*/}
    </div>);
}