import React from 'react';
import Logo from '../Logo/Logo';
import './Header.sass';

export default function Header() {

    return (<div className='header'>
        <Logo/>
        <div>
            {/*<LanguageSelector/>*/}
        </div>
    </div>);
}