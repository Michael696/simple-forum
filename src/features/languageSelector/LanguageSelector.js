import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Form from 'react-bootstrap/Form';

import {
    setCurrent,
    setAvailable,
    currentLanguage,
    availableLanguages
} from './languageSelectorSlice';

export default function LanguageSelector() {
    const available = useSelector(availableLanguages);
    const current = useSelector(currentLanguage);
    const dispatch = useDispatch();
    const options = available.map(lang => <option key={lang.id} value={lang.id}>{lang.label}</option>);
    return (
        <Form className='main-lang-selector'>
            <fieldset>
                <Form.Select
                    id='languageSelect'
                    value={current}
                    onChange={e => {
                        console.log('target',e.target);
                        dispatch(setCurrent(e.target.value)); //available[e.target.selectedIndex].id
                    }}
                >
                    {options}
                </Form.Select>
            </fieldset>
        </Form>
    );
}