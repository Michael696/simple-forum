import React, {useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {currentUser} from './currentUserSlice';
import {useSelector, useDispatch} from 'react-redux';
// import {auth} from './currentUserSlice';
// import {onlineUsersApi} from '../../app/onlineUsersApi';
// import {useAuthMutation} from '../../app/onlineUsersApi'


export default function Auth() {
    const user = useSelector(currentUser);
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const username = usernameRef.current && usernameRef.current.value;
    const password = passwordRef.current && passwordRef.current.value;
    // const [login, {isLoading}] = useAuthMutation();

    // const {data, isLoading} = onlineUsersApi.useAuthQuery({username:'test',password:'123'});
    const submitAuth = async () => {
        console.log('user,pass',usernameRef.current.value,passwordRef.current.value);
        // dispatch(auth({ // TODO auth with back
        //     name: username,
        //     id: password,
        // }));

        // async () => {
/*
        try {
            const user = await login({username, password}).unwrap();
            dispatch(auth(user))
        } catch (err) {
            console.error(err);
        }
*/

    };
// console.log('useAuthMutation data:',login);
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
                    <Button variant="primary" onClick={submitAuth}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
}