import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from 'react-redux';

import {currentUser,} from '../../../features/currentUser/currentUserSlice';
import {url} from "../../../app/urls";
import './Navigation.sass';

export default function Navigation() {
    const user = useSelector(currentUser);

    const signIn = (
        <LinkContainer to={url.SIGN_IN}>
            <span>Sign-in</span>
        </LinkContainer>
    );

    const signOut = (
        <LinkContainer to={url.SIGN_OUT}>
            <span>Sign-out</span>
        </LinkContainer>
    );

    return (
        <Navbar className="navbar navbar-fixed-top">
            <Nav.Link>
                <span>
                    <LinkContainer to='/faq'>
                        <span>FAQ</span>
                    </LinkContainer>
                </span>
            </Nav.Link>

            <Nav.Link>
                <span>
                    <LinkContainer to={url.REGISTER}>
                        <span>Register</span>
                    </LinkContainer>
                </span>
            </Nav.Link>

            <Nav.Link>
                <span>
                    <LinkContainer to='/'>
                        <span>Forums</span>
                    </LinkContainer>
                </span>
            </Nav.Link>

            <Nav.Link>
                <span>
                    {user.name ? signOut : signIn}
                </span>
            </Nav.Link>
        </Navbar>
    );
}