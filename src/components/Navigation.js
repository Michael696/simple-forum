import React from 'react';
import {Nav, Navbar, NavItem, Container, NavDropdown, Breadcrumb} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from 'react-redux';

import {
    currentUser,
} from '../features/currentUser/currentUserSlice';

export default function Navigation() {
    const user = useSelector(currentUser);

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
                    <LinkContainer to='/register'>
                        <span>Register</span>
                    </LinkContainer>
                </span>
            </Nav.Link>

            <Nav.Link>
                <span>
                    <LinkContainer to='/forums'>
                        <span>Forums</span>
                    </LinkContainer>
                </span>
            </Nav.Link>

            {!user.name && (
                <Nav.Link>
                    <span>
                        <LinkContainer to='/signin'>
                            <span>Sign-in</span>
                        </LinkContainer>
                    </span>
                </Nav.Link>
            )}
        </Navbar>
    );
}