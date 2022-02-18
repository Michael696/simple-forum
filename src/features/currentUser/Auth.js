import React, {useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {currentUser} from './currentUserSlice';
import {useSelector, useDispatch} from 'react-redux';
import {auth} from './currentUserSlice';

export default function Auth() {
    const user = useSelector(currentUser);
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const submitAuth = () => {
        dispatch(auth({ // TODO auth with back
            name: usernameRef.current && usernameRef.current.value,
            id: passwordRef.current && passwordRef.current.value,
        }));
    };

    return !user.name &&
        (
            <div className='sign-in'>
                <Form>
                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            ref={usernameRef}
                        />
                        <Form.Text className="text-muted">
                            only characters and numbers
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-describedby="passwordHelpBlock"
                            ref={passwordRef}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={submitAuth}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
}