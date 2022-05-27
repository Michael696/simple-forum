import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {registerClear, registerErrorMessage, registerStart, registerState} from './registerSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {AppDispatch} from "../../app/store";
import {isUserAuthenticated} from "../currentUser/currentUserSlice";
import {useNavigate} from "react-router";
import {url} from "../../app/urls";

export default function Register() {
    const nameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const [name, setName] = useState('b');
    const [eMail, setEmail] = useState('a');
    const [password, setPassword] = useState('a');
    const [password2, setPassword2] = useState('a');
    const [error, setError] = useState('');

    const registering = useAppSelector(registerState);
    const errorMessage = useAppSelector(registerErrorMessage);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const authOk = useAppSelector(isUserAuthenticated);

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
    }, []);

    useEffect(() => {
        if (authOk) {
            console.log('cannot register authenticated user');
            navigate(url.FORUM);
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
        <div>
            Congratulations ! You've been successfully registered!<br/>
            Now you can sign-in.
        </div>
    );

    // TODO refactor onChange handlers
    const formRegister = (
        <div className='form-width-50 border-1 pad-1 border-round-05'>
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
        </div>
    );

    return registering !== 'done' ? formRegister : formDone;
}