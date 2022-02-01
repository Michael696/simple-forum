import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, Breadcrumb} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from 'react-redux';

import {
    currentUser,
} from '../features/currentUser/currentUserSlice';

export default function Navigation() {
    const user = useSelector(currentUser);

    return (
        <Navbar className="navbar navbar-fixed-top">

            <Nav>
                <LinkContainer to='/faq'>
                    <NavItem>
                        FAQ
                    </NavItem>
                </LinkContainer>

                <LinkContainer to='/register'>
                    <NavItem>
                        Register
                    </NavItem>
                </LinkContainer>


                <LinkContainer to='/forums'>
                    <NavItem>
                        Forums
                    </NavItem>
                </LinkContainer>

                {!user.name && (
                    <LinkContainer to='/signin'>
                        <NavItem>
                            Sign-in
                        </NavItem>
                    </LinkContainer>
                )}

            </Nav>
        </Navbar>
    );
}