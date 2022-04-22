import React, {MutableRefObject, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {authenticate, currentUser, isUserAuthenticated} from './currentUserSlice';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

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
        <div className='error-message'>
            {user.error}
        </div>
    ) : '';

    useEffect(() => {
        if (authOk) {
            navigate('/forums');
        }
    }, [authOk]);

    return (
        <div className='sign-in'>
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
                <Button variant="primary" onClick={submitAuth}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}