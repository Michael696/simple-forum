import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, Breadcrumb} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default function Navigation() {
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

                <LinkContainer to='/signin'>
                    <NavItem>
                        Sign-in
                    </NavItem>
                </LinkContainer>

                <LinkContainer to='/forums'>
                    <NavItem>
                        Forums
                    </NavItem>
                </LinkContainer>

            </Nav>
        </Navbar>);
}