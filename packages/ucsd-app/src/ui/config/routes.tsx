import * as React from 'react';
import { Route, Switch } from 'react-router';

import { HomePage } from '../pages/HomePage';
import { HooksPage } from '../pages/HooksPage';
import { MapExplorerPage } from '../pages/MapExplorerPage';
import { MapDataFilesPage } from '../pages/MapDataFilesPage';
import { RoutingPage } from '../pages/RoutingPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ApiTesterPage } from '../pages/ApiTesterPage';
import { IconName, MaybeElement, Button, Intent } from '@blueprintjs/core';
import { Link, NavLink } from 'react-router-dom';

export interface IRouteCoreData {
    path: string;
    component: any;
    exData: IRouteExtraData;
    getRoute: (i: number, exact?: boolean) => any;
    getListItemNavLink: (i: number, liStyle?: any, linkStyle?: any, ln?: string | undefined) => any;
    getNavbarLinkButtons: (
        i: number,
        liStyle?: any,
        linkStyle?: any,
        ln?: string | undefined,
    ) => any;
    getLinkButtons: (i: number, liStyle?: any, linkStyle?: any, ln?: string | undefined) => any;
}
export interface IRouteExtraData {
    linkLabel?: string;
    navLabel?: string;
    icon?: IconName | MaybeElement;
    exact?: boolean;
}
// export const getRouteDataEx = (path: string, component: any, linkName: string, navName?: string): IRouteDataEx => {
export const createRouteCoreData = (
    path: string,
    component: any,
    exData: IRouteExtraData = {},
): IRouteCoreData => {
    exData.linkLabel = exData.linkLabel || exData.navLabel;
    exData.navLabel = exData.navLabel || exData.linkLabel;

    const getRoute = (i: number) => (
        <Route key={i} path={path} component={component} exact={exData.exact} />
    );

    const getListItemNavLink = (
        i: number,
        liStyle?: any,
        linkStyle?: any,
        ln?: string | undefined,
    ) => {
        return (
            <li key={i} style={liStyle}>
                <NavLink
                    key={i}
                    to={path}
                    style={linkStyle}
                    replace={path === location.pathname}
                    activeStyle={{
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#0d11b5',
                        padding: '4px 20px',
                        // border: "2px solid black"
                    }}
                >
                    {ln || exData.linkLabel || '********-YOU FORGOT TO GIVE ME A NAME ********'}
                </NavLink>
            </li>
        );
    };

    const getNavbarLinkButtons = (i: number, linkStyle?: any) => (
        <NavLink key={i} to={path} style={linkStyle} replace={path === location.pathname}>
            <Button icon={exData.icon} text={exData.linkLabel} />
        </NavLink>
    );
    const getLinkButtons = (i: number, linkStyle?: any) => (
        <Link key={i} to={path} style={linkStyle} replace={path === location.pathname}>
            <Button intent={Intent.PRIMARY} text={exData.linkLabel} />
        </Link>
    );
    return {
        path,
        component,
        exData,
        getRoute,
        getListItemNavLink: getListItemNavLink,
        getNavbarLinkButtons,
        getLinkButtons,
    };
};

// export const ROUTE_COMPONENTS_EX = <Switch>{getRouteCompArray(ROUTE_DATA)}</Switch>;
export const MAIN_ROUTES_DATA: Array<IRouteCoreData> = [
    createRouteCoreData('/', HomePage, { linkLabel: 'Home', icon: 'home', exact: true }),
    createRouteCoreData('/hooks', HooksPage, { linkLabel: 'Hooks' }),
    createRouteCoreData('/maps', MapExplorerPage, { linkLabel: 'Explore and Download Maps' }),
    createRouteCoreData('/routes', RoutingPage, { linkLabel: 'Routing' }),
    createRouteCoreData('/files', MapDataFilesPage, { linkLabel: 'Manage Files' }),
    createRouteCoreData('/api', ApiTesterPage, { linkLabel: 'API Tester' }),
    createRouteCoreData('/settings', SettingsPage, { linkLabel: 'Settings' }),
];
export const MAIN_ROUTE_COMPONENTS = MAIN_ROUTES_DATA.map((r, i) => r.getRoute(i));

export interface IRedirectRouteData {
    from: string;
    to: string;
    exact?: boolean;
}
export interface IRedirectData {
    [key: string]: IRedirectRouteData;
}

// export const Redirect = (rr: IRedirectRouteData) =>
//     <Redirect from={rr.from} to={rr.to} exact={rr.exact} />

// export const REDIRECTS_DATA: IRedirectData = {
//     api: { from: '/', to: '/reverse-geocode', exact: true },
// }

// export const Redirects = REDIRECTS_DATA.map(r => Redirect(r))
