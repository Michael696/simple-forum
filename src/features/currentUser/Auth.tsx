import React, {MutableRefObject, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {authClear, authenticate, currentUser, isUserAuthenticated} from './currentUserSlice';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {url} from "../../app/urls";
import {fetchUsers} from "../onlineUsers/onlineUsersSlice";

export default function Auth() {
    const user = useAppSelector(currentUser);
    const authOk = useAppSelector(isUserAuthenticated);
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();


    const submitAuth = async () => {
        // console.log('user,pass', usernameRef.current.value, passwordRef.current.value);

        dispatch(authenticate({
            name: usernameRef.current.value,
            password: passwordRef.current.value,
        }));

    };

    const error = user.error.length > 0 ? (
        <div className='error-message margin1'>
            {user.error}
        </div>
    ) : '';

    useEffect(() => {
        dispatch(authClear());
    }, []);

    useEffect(() => {
        if (authOk) {
            dispatch(fetchUsers());
            navigate(url.FORUM, {replace: true});
        }
    }, [authOk]);

    // TODO fix 'request failed' message after form reload
    return (
        <div className='form-width-50'>
            <Form>
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