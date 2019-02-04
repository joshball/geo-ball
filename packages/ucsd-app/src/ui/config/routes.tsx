import * as React from "react"
import { Route, Switch } from "react-router";

import { HomePage } from '../pages/HomePage'
import { MapExplorerPage } from '../pages/MapExplorerPage'
import { MapDataFilesPage } from '../pages/MapDataFilesPage'
import { RoutingPage } from '../pages/RoutingPage'
import { SettingsPage } from '../pages/SettingsPage'
import { IconName, MaybeElement, Button, Intent } from "@blueprintjs/core";
import { Link } from "react-router-dom";


export interface IRouteData {
    name: string;
    path: string;
    component: any;
    icon?: IconName | MaybeElement;
    exact?: boolean;
    navButtonTxt?: string;
}
export interface IRouteConfig {
    home: IRouteData
    maps: IRouteData
    routes: IRouteData
    files: IRouteData
    settings: IRouteData
}

export const ROUTE_DATA: IRouteConfig = {
    home: { name: 'home', navButtonTxt: 'Home', path: '/', component: HomePage, icon: 'home', exact: true },
    maps: { name: 'maps', navButtonTxt: 'Explore and Download Maps', path: '/maps', component: MapExplorerPage, },
    routes: { name: 'routes', navButtonTxt: 'Routing', path: '/routes', component: RoutingPage },
    files: { name: 'files', navButtonTxt: 'Manage Files', path: '/files', component: MapDataFilesPage },
    settings: { name: 'settings', navButtonTxt: 'Settings', path: '/settings', component: SettingsPage },
}

export const getRouteDataArray = (rd: any): Array<IRouteData> => Object.keys(rd).map(k => rd[k]);

export const getRouteComp = (r: IRouteData, i: number) => <Route key={i} path={r.path} component={r.component} exact={r.exact} />
export const getRouteCompArray = (rd: any) => getRouteDataArray(rd).map(getRouteComp);

export const ROUTE_COMPONENTS = <Switch>{getRouteCompArray(ROUTE_DATA)}</Switch>;


export const getRouteNavLinkComp = (r: IRouteData, i: number) => (
    <Link key={i} to={r.path}>
        <Button icon={r.icon} text={r.navButtonTxt} />
    </Link>
)
export const getRouteNavLinkCompArray = (rd: any) => getRouteDataArray(rd).map(getRouteNavLinkComp);
export const LINK_COMPONENTS = getRouteNavLinkCompArray(ROUTE_DATA);


