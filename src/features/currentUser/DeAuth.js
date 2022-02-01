import React from 'react';
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';
import {deAuth} from './currentUserSlice';

export default function DeAuth() {
    const dispatch = useDispatch();

    return (<div className='sign-out'>
        <Button
            onClick={() => {
                dispatch(deAuth())
            }}
        >
            Sign out
        </Button>
    </div>);
}