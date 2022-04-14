import React, {useEffect, useRef, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {useSelector, useDispatch} from 'react-redux';
import {register, registerState, registerClear} from '../registerUser/registerSlice';


export default function Register() {
    const nameRef = useRef();
    const [name, setName] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const registering = useSelector(registerState);

    const dispatch = useDispatch();
    console.log('registering', registering);

    useEffect(() => {
        nameRef.current.focus();
        return () => {
            dispatch(registerClear());
        }
    }, []);

    useEffect(() => {
        if (registering === 'error') {
            setError('register error');
        }
    }, [registering]);

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
            dispatch(register({name, eMail, password}));
        }
    };

    const formDone = (
        <div>
            Congratulations ! You've been successfully registered!
        </div>
    );

    const formRegister = (
        <div className='sign-in'>
            <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    ref={nameRef}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        setError('');
                        dispatch(registerClear());
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
                        setEmail(e.target.value)
                        setError('');
                        dispatch(registerClear());
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
                        setPassword(e.target.value)
                        setError('');
                        dispatch(registerClear());
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
                        setPassword2(e.target.value)
                        setError('');
                        dispatch(registerClear());
                    }}
                />
            </Form.Group>

            {
                error ? (
                    <Form.Group className='register__error'>
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