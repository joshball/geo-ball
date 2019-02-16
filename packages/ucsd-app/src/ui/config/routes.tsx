import * as React from "react"
import { Route, Switch } from "react-router";

import { HomePage } from '../pages/HomePage'
import { HooksPage } from '../pages/HooksPage'
import { MapExplorerPage } from '../pages/MapExplorerPage'
import { MapDataFilesPage } from '../pages/MapDataFilesPage';
import { RoutingPage } from '../pages/RoutingPage'
import { SettingsPage } from '../pages/SettingsPage'
import { ApiTesterPage } from '../pages/ApiTesterPage';
import { IconName, MaybeElement, Button, Intent } from "@blueprintjs/core";
import { Link } from "react-router-dom";


export interface IRouteCoreData {
    path: string;
    component: any;
    exData: IRouteExtraData;
    getRoute: (i: number, exact?: boolean) => any;
    getLink: (i: number, linkStyle?: any, ln?: string | undefined) => any;
    getListItemLink: (i: number, liStyle?: any, linkStyle?: any, ln?: string | undefined) => any;
    getNavbarLinkButtons: (i: number, liStyle?: any, linkStyle?: any, ln?: string | undefined) => any;
    getLinkButtons: (i: number, liStyle?: any, linkStyle?: any, ln?: string | undefined) => any;
}
export interface IRouteExtraData {
    linkLabel?: string;
    navLabel?: string;
    icon?: IconName | MaybeElement;
    exact?: boolean;
}
// export const getRouteDataEx = (path: string, component: any, linkName: string, navName?: string): IRouteDataEx => {
export const createRouteCoreData = (path: string, component: any, exData: IRouteExtraData = {}): IRouteCoreData => {

    exData.linkLabel = exData.linkLabel || exData.navLabel;
    exData.navLabel = exData.navLabel || exData.linkLabel;

    const getRoute = (i: number) =>
        <Route key={i} path={path} component={component} exact={exData.exact} />

    const getLink = (i: number, linkStyle?: any, ln?: string | undefined) =>
        <Link key={i} to={path} style={linkStyle}>
            {ln || exData.linkLabel || '********-YOU FORGOT TO GIVE ME A NAME ********'}
        </Link>

    const getListItemLink = (i: number, liStyle?: any, linkStyle?: any, ln?: string | undefined) =>
        <li key={i} style={liStyle}>
            {getLink(i, linkStyle, ln)}
        </li>

    const getNavbarLinkButtons = (i: number, linkStyle?: any) => (
        <Link key={i} to={path} style={linkStyle}>
            <Button icon={exData.icon} text={exData.linkLabel} />
        </Link>
    )
    const getLinkButtons = (i: number, linkStyle?: any) => (
        <Link key={i} to={path} style={linkStyle}>
            <Button intent={Intent.PRIMARY} text={exData.linkLabel} />
        </Link>
    )
    return {
        path,
        component,
        exData,
        getRoute,
        getLink,
        getListItemLink,
        getNavbarLinkButtons,
        getLinkButtons
    }
}


// export const ROUTE_COMPONENTS_EX = <Switch>{getRouteCompArray(ROUTE_DATA)}</Switch>;
export const MAIN_ROUTES_DATA: Array<IRouteCoreData> = [
    createRouteCoreData('/', HomePage, { linkLabel: 'Home', icon: 'home', exact: true }),
    createRouteCoreData('/hooks', HooksPage, { linkLabel: 'Hooks' }),
    createRouteCoreData('/maps', MapExplorerPage, { linkLabel: 'Explore and Download Maps' }),
    createRouteCoreData('/routes', RoutingPage, { linkLabel: 'Routing' }),
    createRouteCoreData('/files', MapDataFilesPage, { linkLabel: 'Manage Files' }),
    createRouteCoreData('/api', ApiTesterPage, { linkLabel: 'API Tester' }),
    createRouteCoreData('/settings', SettingsPage, { linkLabel: 'Settings' }),
]
export const MAIN_ROUTE_COMPONENTS = MAIN_ROUTES_DATA.map((r, i) => r.getRoute(i));




export interface IRedirectRouteData {
    from: string;
    to: string;
    exact?: boolean;
}
export interface IRedirectData {
    [key: string]: IRedirectRouteData;
}

export const Redirect = (rr: IRedirectRouteData) =>
    <Redirect from={rr.from} to={rr.to} exact={rr.exact} />

export const REDIRECTS: IRedirectData = {
    api: { from: '/', to: '/reverse-geocode', exact: true },
}
