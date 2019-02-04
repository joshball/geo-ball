import * as React from "react"
import { Navbar, Alignment, Button } from "@blueprintjs/core";

import { Link } from "react-router-dom";
import {ROUTE_DATA as RD, LINK_COMPONENTS} from '../../config/routes';

export const NavBarMenuComponent = (_props:any) => <Navbar className="bp3-dark">
    <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>UCSD</Navbar.Heading>
        <Navbar.Divider />
        {LINK_COMPONENTS}
    </Navbar.Group>
</Navbar>;
