// This is the top-most component in the app.
import * as React from "react"
import { Route, Switch } from "react-router";
import { MemoryRouter, Link } from 'react-router-dom';
import "glamor/reset";
import { compose } from "glamor"
// require('devtron').install()

import { styles, colors } from "../config/theme"
import { MapExplorerPage } from "../pages/MapExplorerPage";
import { RoutingPage } from "../pages/RoutingPage";
import { MapDataFilesPage } from "../pages/MapDataFilesPage";
import { HomePage } from '../pages/HomePage';
import { Provider, observer } from "mobx-react";
// import DevTools from 'mobx-react-devtools';
// import { autorun } from "mobx";


import { RootStore } from "../stores/RootStore";
import state from "../state/State";
import { Navbar, Alignment, Button, Intent } from "@blueprintjs/core";
// import BackgroundTask from '../../background/BackgroundTask';
const rootStore = new RootStore(state);
// autorun(() => rootStore);

// tslint:disable-next-line:no-var-requires
// require("normalize.css/normalize.css");



const ROOT = compose(styles.fullScreen, {
    background: colors.window.background,
    "& ::-webkit-scrollbar": { backgroundColor: colors.scrollbar.base, width: 12, height: 12 },
    "& ::-webkit-scrollbar-track": { backgroundColor: colors.scrollbar.track },
    "& ::-webkit-scrollbar-thumb": { backgroundColor: colors.scrollbar.thumb, borderRadius: 4 },
})


const navBar = <Navbar className="bp3-dark">
    <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>UCSD</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/" className="bp3-minimal" >
            <Button icon="home" text="Home" />
        </Link>
        <Link to="/maps">
            <Button text="Explore and Download Maps" />
        </Link>
        <Link to="/files">
            <Button text="Manage Files" />
        </Link>
        <Link to="/routes">
            <Button text="Routing" />
        </Link>
    </Navbar.Group>
</Navbar>;

const routes = <Switch>
    <Route path='/' component={HomePage} exact />
    {/* <Route path='/' component={BackgroundTask} exact /> */}
    {/* <Route path='/' component={MapExplorerPage} exact /> */}
    <Route path='/maps' component={MapExplorerPage} />
    <Route path='/routes' component={RoutingPage} />
    <Route path='/files' component={MapDataFilesPage} />
</Switch>;


@observer
export class RootComponent extends React.Component<{}, {}> {
    render() {
        console.log('location.pathname:', location.pathname)
        return (
            <MemoryRouter {...ROOT} >
                <Provider stores={rootStore}>
                    <div>
                        {navBar}
                        {routes}
                    </div>
                </Provider>
            </MemoryRouter>
        )
    }
}
