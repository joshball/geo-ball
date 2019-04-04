import * as React from 'react';
import { Redirect, Switch, Route } from 'react-router';

import { Tabs, Pane, Box, styled } from '@geo-ball/component-lib';

import { createRouteCoreData, IRouteCoreData } from '../config/routes';

import { GeocodingApiPanel } from '../components/apiPanels/GeocodingApi';
import { GeocodingApiPanel as OrigGeocodingApiPanel } from '../components/apiPanels/GeocodingApi.Orig';
// import { ReverseGeocodingApiPanel } from '../components/apiPanels/ReverseGeocodingApiPanel';
import { OsmDownalodApiPanel } from '../components/apiPanels/OsmDownalodApiPanel';
import { GenericApiPanel, FormikTestsPanel, InformedTestsPanel } from '../components/apiPanels';

// const styles: any = {};

// styles.tabBarUl = {
//     padding: 0,
//     margin: 0,
//     //   position: 'absolute',
//     top: 0,
//     height: '50px',
//     width: '100%',
//     display: 'flex',
// };

// styles.tabListItem = {
//     textAlign: 'center',
//     flex: 1,
//     listStyleType: 'none',
//     padding: '15px',
// };

const ApiPageWrap = styled(Box)`
    padding: 10px;
`;

const TabBarUl = styled.ul`
    padding: 0;
    margin: 0;
    top: 0;
    height: 50px;
    width: 100%;
    display: flex;
`;

// styles.tabLink = {
//     color: Colors.BLACK,
//     fontFamily: 'sans-serif',
// };

const TabLink = styled(Box)`
    color: black;
    font-family: sans-serif;
`;

// styles.tabBarDiv = {
//     display: 'block',
//     backgroundColor: Colors.LIGHT_GRAY1,
// };
// background-color: ${palette('white900')};
const TabBar = styled(Box)`
    display: block;
    background-color: white700;
`;

export const createRouteCoreDataArray = (match: any): Array<IRouteCoreData> => {
    const routes: Array<IRouteCoreData> = [
        createRouteCoreData(match.url + '/geocode-orig', OrigGeocodingApiPanel, {
            linkLabel: 'Geocode API Orig',
        }),
        createRouteCoreData(match.url + '/geocode', GeocodingApiPanel, {
            linkLabel: 'Geocode API',
        }),
        // createRouteCoreData(match.url + '/reverse-geocode', ReverseGeocodingApiPanel, { linkLabel: 'Reverse Geocode API'}),
        createRouteCoreData(match.url + '/download', OsmDownalodApiPanel, {
            linkLabel: 'OSM Download API',
        }),
        createRouteCoreData(match.url + '/generic', GenericApiPanel, {
            linkLabel: 'Generic API',
        }),
        createRouteCoreData(match.url + '/ftp', FormikTestsPanel, {
            linkLabel: 'Formik Test Form',
        }),
        createRouteCoreData(match.url + '/itp', InformedTestsPanel, {
            linkLabel: 'Informed Test Form',
        }),
    ];
    return routes;
};
export const createRoutesAndLinks = (match: any): any => {
    const routeCourtDataArray = createRouteCoreDataArray(match);
    const theRoutes = routeCourtDataArray.map((r, i) => r.getRoute(i));

    const theLinks = routeCourtDataArray.map((r, i) =>
        // r.getListItemNavLink(i, styles.tabListItem, styles.tabLink),
        r.getListItemNavLink(i),
    );

    return { theRoutes, theLinks };
};

export const getDefaultRouteRedirect = ({ match, location }: any): any => {
    const currentUrl = match.url;
    const urls = {
        base: currentUrl,
        geocode: `${currentUrl}/geocode`,
        geocodeOrig: `${currentUrl}/geocode-orig`,
        download: `${currentUrl}/download`,
        generic: `${currentUrl}/generic`,
        ftp: `${currentUrl}/ftp`,
        itp: `${currentUrl}/itp`,
    };
    const maybeRedirect =
        urls.base === location.pathname ? (
            <Redirect from={urls.base} to={urls.generic} exact={true} />
        ) : null;
    // console.log("theLinks", theLinks)
    // console.log('maybeRedirect', maybeRedirect);
    return null;
    return maybeRedirect;
};

export const ApiTesterPage = (params: any) => {
    console.log('ApiTesterPage.params', params);

    const { theRoutes, theLinks } = createRoutesAndLinks(params.match);
    const defaultRedirect = getDefaultRouteRedirect(params);
    return (
        <ApiPageWrap>
            <TabBar>
                <TabBarUl>{theLinks}</TabBarUl>
            </TabBar>
            {/* <div style={styles.tabBarDiv}>
                <ul style={styles.tabBarUl}>{theLinks}</ul>
            </div> */}
            <Switch>{theRoutes}</Switch>
            {defaultRedirect}
        </ApiPageWrap>
    );
};

// const createTab = (routeTag: string, tabTitle: string, tabs: any) => {
//     const fullRoute = `${currentUrl}/${routeTag}`;
//     const isActive = params.location.pathname === fullRoute;
//     return (
//         <Tabs.Tab isActive={isActive} tab={routeTag} {...tabs}>
//             <Link to={fullRoute}>{tabTitle}</Link>
//         </Tabs.Tab>
//     );
// };
// const LinkedTab = (props: any) => {
//     const { routeTag, title, ...tabs } = props;
//     const fullRoute = `${currentUrl}/${routeTag}`;
//     const isActive = params.location.pathname === fullRoute;
//     console.log(
//         `  - LinkedTab(${routeTag}, ${fullRoute}) active: ${isActive} loc[${
//             params.location.pathname
//         }]`,
//     );
//     return (
//         <Tabs.Tab isActive={isActive} tab={routeTag} {...tabs}>
//             <Link to={fullRoute}>{title}</Link>
//         </Tabs.Tab>
//     );
// };
// console.log('ApiTesterPage.RENDERING');
// return (
//     <React.Fragment>
//         {maybeRedirect}
//         <Tabs.Container>
//             {tabs => {
//                 console.log("TABS TABS TABS!", tabs)
//                 console.log("TABS.current", tabs.current)
//                 // console.log("TABS.isCurrent", tabs.isCurrent())
//                 // console.log("TABS.show", tabs.show())
//                 console.log("TABS.getCurrentId", tabs.getCurrentId())
//                 return (
//                     <React.Fragment>
//                         <Pane margin="20px 0px 20px 0px">
//                             <Tabs isFitted>
//                                 {console.log("RENDERING LINKED TABS:")}
//                                 <LinkedTab routeTag="geocode" title="Geocode API" {...tabs} />
//                                 <LinkedTab
//                                     routeTag="download"
//                                     title="OSM Download API"
//                                     {...tabs}
//                                 />
//                                 <LinkedTab routeTag="generic" title="Generic API" {...tabs} />
//                             </Tabs>
//                         </Pane>
//                         <Tabs.Panel tab="geocode" padding="major-3" {...tabs}>
//                             Geocode API
//                             {console.log("RENDERING geocode panel")}
//                             {urls.geocode}
//                             {/* <Route path={urls.geocode} component={GeocodingApiPanel} /> */}
//                         </Tabs.Panel>
//                         <Tabs.Panel tab="download" padding="major-3" {...tabs}>
//                             OSM Download API
//                             {console.log("RENDERING download panel")}
//                             {urls.download}
//                             {/* <Route path={urls.download} component={OsmDownalodApiPanel} /> */}
//                         </Tabs.Panel>
//                         <Tabs.Panel tab="generic" padding="major-3" {...tabs}>
//                             Generic API
//                             {console.log("RENDERING GENERIC panel")}
//                             {urls.generic}
//                             {/* <Route path={urls.generic} component={GenericApiPanel} /> */}
//                         </Tabs.Panel>
//                     </React.Fragment>
//                 )
//             }}
//         </Tabs.Container>
//     </React.Fragment>
// )
