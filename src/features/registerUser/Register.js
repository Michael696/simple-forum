import React, {useEffect, useRef, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
// import {currentUser} from './currentUserSlice';
import {useSelector, useDispatch} from 'react-redux';


export default function Register() {
    const nameRef = useRef();
    const [name, setName] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const handleSubmit = event => {
        if (name==='') {
            setError('name is empty');
        } else if (eMail==='') {
            setError('e-mail is empty');
        } else if (password !== password2) {
            setError('passwords are different');
        } else if (password === '') {
            setError('password is empty');
        }
    };

    return (
        <div className='sign-in'>
            <Form>
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
                        }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers, and
                        must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>

                {
                    error ? (
                        <Form.Group className='register__error'>
                            <Form.Label>{error}</Form.Label>
                        </Form.Group>
                    ) : ''
                }

                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}