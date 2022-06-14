import React, {KeyboardEvent, MutableRefObject, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {authenticate, selectIsUserAuthenticated, selectLastAuthError} from './currentUserSlice';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {url} from "../../app/urls";
import {fetchUsers} from "../onlineUsers/onlineUsersSlice";

export default function Auth() {
    const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
    const authError = useAppSelector(selectLastAuthError);
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();

    const submitAuth = () => {
        dispatch(authenticate({
            name: usernameRef.current.value,
            password: passwordRef.current.value,
        }));

    };
    const error = authError ? (
        <div className='error-message margin1 border-round-025 pad025 center'>
            {authError}
        </div>
    ) : '';

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
            navigate(url.FORUM, {replace: true});
        }
    }, [isAuthenticated, dispatch, navigate]);

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitAuth();
        }
    };

    return (
        <div className='register form-width-50'>
            <h6 className='sign-in__header center border-1-top border-1-left border-1-right border-1-bottom pad05 border-top-round-025'>Sign-in</h6>
            <Form className='border-1-right border-1-left border-1-bottom border-bottom-round-025 pad-1'>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label className='bold'>Username</Form.Label>
                    <Form.Control
                        type="text"
                        ref={usernameRef}
                        onKeyPress={handleKey}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUserPassword">
                    <Form.Label className='bold'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        ref={passwordRef}
                        onKeyPress={handleKey}
                    />
                </Form.Group>
                {error}
                <Button onClick={submitAuth}> Login </Button>
            </Form>
        </div>
    );
}