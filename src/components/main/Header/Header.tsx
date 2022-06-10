import React from 'react';
import Logo from '../Logo/Logo';
import './Header.sass';
import Navigation from "../Navigation/Navigation";
import CurrentTime from "../CurrentTime/CurrentTime";
import CurrentUser from "../../../features/currentUser/CurrentUser";
import {User} from "../../../app/types";
import {useAppSelector} from "../../../app/hooks";
import {selectCurrentUser} from "../../../features/currentUser/currentUserSlice";
import CustomBreadcrumb from "../CustomBreadcrumb/CustomBreadcrumb";

export default function Header() {
    const user: User = useAppSelector(selectCurrentUser);

    return (<div className='header margin1-bottom'>
        <Logo/>
        <Navigation/>
        <CustomBreadcrumb/>
        <CurrentTime/>
        <CurrentUser user={user}/>
{/*
            <LanguageSelector/>
*/}
    </div>);
}