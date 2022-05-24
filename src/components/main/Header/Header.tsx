import React from 'react';
import Logo from '../Logo/Logo';
import {currentUser,} from '../../../features/currentUser/currentUserSlice';
import './Header.sass';
import {useAppSelector} from "../../../app/hooks";

export default function Header() {
    const user = useAppSelector(currentUser);

    return (<div className='header'>
        <Logo/>
        <div>
            {/*<LanguageSelector/>*/}
        </div>
    </div>);
}