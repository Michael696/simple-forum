import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {LinkContainer} from 'react-router-bootstrap';
import {registerClear, registerStart, selectRegisterErrorMessage, selectRegisterState} from './registerSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {AppDispatch} from "../../app/store";
import {selectIsUserAuthenticated} from "../currentUser/currentUserSlice";
import {useNavigate} from "react-router";
import {url} from "../../app/urls";
import './Register.sass';

export default function Register() {
    const nameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const [name, setName] = useState('b');
    const [eMail, setEmail] = useState('a');
    const [password, setPassword] = useState('a');
    const [password2, setPassword2] = useState('a');
    const [error, setError] = useState('');

    const registering = useAppSelector(selectRegisterState);
    const errorMessage = useAppSelector(selectRegisterErrorMessage);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const authOk = useAppSelector(selectIsUserAuthenticated);

    const regClear = () => {
        if (registering !== 'idle') {
            dispatch(registerClear());
        }
    };

    useEffect(() => {
        nameRef.current.focus();
        return () => {
            dispatch(registerClear());
        }
    }, [nameRef]);

    useEffect(() => {
        if (authOk) {
            console.log('cannot register authenticated user');
            setTimeout(() => {
                navigate(url.FORUM);
            }, 0);
        }
    }, [authOk]);

    useEffect(() => {
        if (registering === 'error') {
            // @ts-ignore
            setError(errorMessage);
        }
    }, [registering, error]);

    const handleSubmit = event => {
        if (name === '') {
            setError('name is empty');
        } else if (eMail === '') {
            setError('e-mail is empty');
        } else if (password !== password2) {
            setError('passwords are different');
        } else if (password === '') {
            setError('password is empty');
        } else { // all OK
            dispatch(registerStart({name, eMail, password}))
        }
    };

    const formDone = (
        <h5 className='center bold'>
            Congratulations ! You've been successfully registered!<br/>
            Now you can <LinkContainer to={url.SIGN_IN}><a>sign-in</a></LinkContainer>
        </h5>
    );

    // TODO implement real user registration (now it's a fake)
    // TODO refactor onChange handlers
    const formRegister = (
        <div className='register form-width-50'>
            <h6 className='register__header center border-1-top border-1-left border-1-right border-1-bottom pad05 border-top-round-025'>
                Register new user
            </h6>
            <Form className='border-1-right border-1-left border-1-bottom border-bottom-round-025 pad-1'>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        ref={nameRef}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                            regClear();
                        }}
                    />
                    <Form.Text className="text-muted">
                        only characters and numbers
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUserEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your e-mail"
                        value={eMail}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                            regClear();
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUserPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-describedby="passwordHelpBlock"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                            regClear();
                        }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers, and
                        must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUserPassword2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat password"
                        aria-describedby="passwordHelpBlock"
                        value={password2}
                        onChange={(e) => {
                            setPassword2(e.target.value);
                            setError('');
                            regClear();
                        }}
                    />
                </Form.Group>

                {
                    error ? (
                        <Form.Group className='error-message margin1 border-round-025'>
                            <Form.Label>{error}</Form.Label>
                        </Form.Group>
                    ) : ''
                }

                <Button {...((registering === 'pending' || registering === 'error') ? {disabled: true} : {})}
                        variant="primary"
                        onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );

    return registering !== 'done' ? formRegister : formDone;
}