import * as React from "react"
import { Navbar, Alignment, Button } from "@blueprintjs/core";

import { MAIN_ROUTES_DATA } from '../../config/routes';

const NavBarHomeLinkButton = MAIN_ROUTES_DATA
    .find(r => r.path === '/')!.getNavbarLinkButtons(0);

const NavBarLinkButtons = MAIN_ROUTES_DATA
    .filter(r => r.path !== '/')
    .map((r, i) => r.getNavbarLinkButtons(i));

export const NavBarMenuComponent = (_props: any) => <Navbar className="bp3-dark">
    <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>{NavBarHomeLinkButton}</Navbar.Heading>
        <Navbar.Divider />
        {NavBarLinkButtons}
    </Navbar.Group>
</Navbar>;
