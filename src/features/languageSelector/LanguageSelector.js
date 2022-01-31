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
    const options = available.map(lang => {
        return current === lang.id ?
            (<option id={lang.id} selected>{lang.label}</option>)
            :
            (<option id={lang.id}>{lang.label}</option>)
    });
    return (
        <Form className='main-lang-selector'>
            <fieldset>
                <Form.Select
                    id='languageSelect'
                    onChange={e => {
                        dispatch(setCurrent(available[e.target.selectedIndex].id))
                    }}
                >
                    {options}
                </Form.Select>
            </fieldset>
        </Form>
    );
}