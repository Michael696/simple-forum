import React from 'react';
import Logo from './Logo';
import LanguageSelector from '../features/languageSelector/LanguageSelector';

export default function Header() {
    return (<div className='main-header'>
        <Logo/>
        <div>Header</div>
        <LanguageSelector/>
    </div>);
}