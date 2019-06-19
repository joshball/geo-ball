import React from 'react';
import { Navbar, Alignment, Classes, Button } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';

export const NavBarMenuComponent = (_props: any) => (
    // <Navbar className={Classes.DARK}>
    <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>OSM Data File Manager</Navbar.Heading>
            <NavLink to="/">
                <Button
                    className={Classes.MINIMAL}
                    icon="folder-open"
                    text="Overpass Query Files"
                />
            </NavLink>
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
            <NavLink to="/settings">
                <Button
                    className={Classes.MINIMAL}
                    icon="settings"
                    text="Settings"
                />
            </NavLink>
        </Navbar.Group>
    </Navbar>
);
