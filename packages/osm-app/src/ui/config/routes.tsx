import React from 'react';
import {} from 'react-router';
import { Route, Link, NavLink } from 'react-router-dom';
// import { Button, styled } from '@geo-ball/component-lib';
import { OverpassDataFileManagerPage } from '../pages/OverpassDataFileManagerPage';
import { SettingsPage } from '../pages/SettingsPage';
import styled from '@emotion/styled';
import { Button, Classes } from '@blueprintjs/core';

export interface IRouteCoreData {
    path: string;
    component: any;
    exData: IRouteExtraData;
    getRoute: (i: number, exact?: boolean) => any;
    getListItemNavLink: (
        i: number,
        liStyle?: any,
        linkStyle?: any,
        ln?: string | undefined
    ) => any;
    getNavbarLinkButtons: (
        i: number,
        liStyle?: any,
        linkStyle?: any,
        ln?: string | undefined
    ) => any;
    getLinkButtons: (
        i: number,
        liStyle?: any,
        linkStyle?: any,
        ln?: string | undefined
    ) => any;
}
export interface IRouteExtraData {
    linkLabel?: string;
    navLabel?: string;
    icon?: string;
    exact?: boolean;
}
const TabListItem = styled.li`
    text-align: center;
    flex: 1;
    list-style-type: none;
    padding: 15px;
`;
// const TabListItem = styled.li`
//     color: black;
//     font-family: sans-serif;
// `;

const linkStyle = {
    color: 'black',
    fontFamily: 'sans-serif',
};

// const TabLink = styled(Box)`
//     color: black;
//     font-family: sans-serif;
// `;
// export const getRouteDataEx = (path: string, component: any, linkName: string, navName?: string): IRouteDataEx => {
export const createRouteCoreData = (
    path: string,
    component: any,
    exData: IRouteExtraData = {}
): IRouteCoreData => {
    exData.linkLabel = exData.linkLabel || exData.navLabel;
    exData.navLabel = exData.navLabel || exData.linkLabel;

    const getRoute = (i: number) => (
        <Route key={i} path={path} component={component} exact={exData.exact} />
    );

    const getListItemNavLink = (
        i: number,
        // liStyle?: any,
        // linkStyle?: any,
        ln?: string | undefined
    ) => {
        return (
            <TabListItem key={i}>
                <NavLink
                    key={i}
                    to={path}
                    // style={linkStyle}
                    replace={path === location.pathname}
                    activeStyle={{
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#0d11b5',
                        padding: '4px 20px',
                        // border: "2px solid black"
                    }}
                >
                    {ln ||
                        exData.linkLabel ||
                        '********-YOU FORGOT TO GIVE ME A NAME ********'}
                </NavLink>
            </TabListItem>
        );
    };

    const getNavbarLinkButtons = (i: number, linkStyle?: any) => (
        <NavLink key={i} to={path} replace={path === location.pathname}>
            {/* iconAfter={exData.icon} */}
            {/* <Button className={Classes.MINIMAL} icon="home" text="Home" /> */}
            <Button className={Classes.MINIMAL}>{exData.linkLabel}</Button>
        </NavLink>
    );
    const getLinkButtons = (i: number, linkStyle?: any) => (
        <Link key={i} to={path} replace={path === location.pathname}>
            <Button>{exData.linkLabel}</Button>
        </Link>
    );
    // const getNavbarLinkButtons = (i: number, linkStyle?: any) => (
    //     <NavLink key={i} to={path} style={linkStyle} replace={path === location.pathname}>
    //         {/* iconAfter={exData.icon} */}
    //         <Button>{exData.linkLabel}</Button>
    //     </NavLink>
    // );
    // const getLinkButtons = (i: number, linkStyle?: any) => (
    //     <Link key={i} to={path} style={linkStyle} replace={path === location.pathname}>
    //         <Button>{exData.linkLabel}</Button>
    //     </Link>
    // );
    return {
        path,
        component,
        exData,
        getRoute,
        getListItemNavLink,
        getNavbarLinkButtons,
        getLinkButtons,
    };
};

// export const ROUTE_COMPONENTS_EX = <Switch>{getRouteCompArray(ROUTE_DATA)}</Switch>;
export const MAIN_ROUTES_DATA: Array<IRouteCoreData> = [
    createRouteCoreData('/', OverpassDataFileManagerPage, {
        linkLabel: 'Manage Files',
        exact: true,
    }),
    createRouteCoreData('/settings', SettingsPage, { linkLabel: 'Settings' }),
    // createRouteCoreData('/', HomePage, { linkLabel: 'Home', icon: 'home', exact: true }),
    // createRouteCoreData('/hooks', HooksPage, { linkLabel: 'Hooks' }),
    // createRouteCoreData('/maps', MapExplorerPage, { linkLabel: 'Explore and Download Maps' }),
    // createRouteCoreData('/routes', RoutingPage, { linkLabel: 'Routing' }),
    // createRouteCoreData('/files', MapDataFilesPage, { linkLabel: 'Manage Files' }),
    // createRouteCoreData('/api', ApiTesterPage, { linkLabel: 'API Tester' }),
    // createRouteCoreData('/settings', SettingsPage, { linkLabel: 'Settings' }),
];
export const MAIN_ROUTE_COMPONENTS = MAIN_ROUTES_DATA.map((r, i) =>
    r.getRoute(i)
);

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
