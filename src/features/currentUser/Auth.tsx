import React, {MutableRefObject, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {authenticate, isUserAuthenticated, lastAuthError} from './currentUserSlice';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {url} from "../../app/urls";
import {fetchUsers} from "../onlineUsers/onlineUsersSlice";

export default function Auth() {
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const authError = useAppSelector(lastAuthError);
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();


    const submitAuth = async () => {
        dispatch(authenticate({
            name: usernameRef.current.value,
            password: passwordRef.current.value,
        }));

    };
    const error = authError ? (
        <div className='error-message margin1 border-round-025'>
            {authError}
        </div>
    ) : '';

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
            navigate(url.FORUM, {replace: true});
        }
    }, [isAuthenticated]);

    return (
        <div className='register form-width-50'>
            <h6 className='sign-in__header center border-1-top border-1-left border-1-right border-1-bottom pad05 border-top-round-025'>Sign-in</h6>
            <Form className='border-1-right border-1-left border-1-bottom border-bottom-round-025 pad-1'>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        ref={usernameRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUserPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-describedby="passwordHelpBlock"
                        ref={passwordRef}
                    />
                </Form.Group>
                {error}
                <Button onClick={submitAuth}> Login </Button>
            </Form>
        </div>
    );
}