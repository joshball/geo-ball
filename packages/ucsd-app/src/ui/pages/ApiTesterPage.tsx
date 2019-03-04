import * as React from "react"
import { Colors } from "@blueprintjs/core"
import { createRouteCoreData, IRouteCoreData } from "../config/routes"
import { GeocodingApiPanel } from "../components/apiPanels/GeocodingApi"
// import { ReverseGeocodingApiPanel } from '../components/apiPanels/ReverseGeocodingApiPanel';
import { OsmDownalodApiPanel } from "../components/apiPanels/OsmDownalodApiPanel"
import { Redirect, Switch, Route } from "react-router"
import { Link } from "react-router-dom"
import { GenericApiPanel, GenericTestFormPanel, GenericApiFormsPanel } from "../components/apiPanels/GenericApi"
import { Tabs, Pane } from "@geo-ball/component-lib"

const styles: any = {}

styles.tabBarDiv = {
    display: "block",
    backgroundColor: Colors.LIGHT_GRAY1,
}

styles.tabBarUl = {
    padding: 0,
    margin: 0,
    //   position: 'absolute',
    top: 0,
    height: "50px",
    width: "100%",
    display: "flex",
}

styles.tabLink = {
    color: Colors.BLACK,
    fontFamily: "sans-serif",
}

styles.tabListItem = {
    textAlign: "center",
    flex: 1,
    listStyleType: "none",
    padding: "15px",
}

export const ApiTesterPage = (params: any) => {
    console.log("ApiTesterPage.params", params)
    // console.log("params.match", params.match)
    // console.log("params.location", params.location)
    const routes: Array<IRouteCoreData> = [
        createRouteCoreData(params.match.url + "/geocode", GeocodingApiPanel, {
            linkLabel: "Geocode API",
        }),
        // createRouteCoreData(params.match.url + '/reverse-geocode', ReverseGeocodingApiPanel, { linkLabel: 'Reverse Geocode API'}),
        createRouteCoreData(params.match.url + "/download", OsmDownalodApiPanel, {
            linkLabel: "OSM Download API",
        }),
        createRouteCoreData(params.match.url + "/generic", GenericApiPanel, {
            linkLabel: "Generic API",
        }),
        createRouteCoreData(params.match.url + "/gtf", GenericTestFormPanel, {
            linkLabel: "Generic Test Form",
        }),
        createRouteCoreData(params.match.url + "/gaf", GenericApiFormsPanel, {
            linkLabel: "Generic API Forms",
        }),
    ]

    const theRoutes = routes.map((r, i) => r.getRoute(i))

    // theRoutes.unshift(
    //     <Redirect
    //         key={routes.length}
    //         from={params.match.url + "/"}
    //         to={params.match.url + "/generic"}
    //         exact={true}
    //     />,
    // )

    const theLinks = routes.map((r, i) =>
        r.getListItemNavLink(i, styles.tabListItem, styles.tabLink),
    )
    const currentUrl = params.match.url
    const urls = {
        base: currentUrl,
        geocode: `${currentUrl}/geocode`,
        download: `${currentUrl}/download`,
        generic: `${currentUrl}/generic`,
        gtf: `${currentUrl}/gtf`,
        gaf: `${currentUrl}/gaf`,
    }
    // console.log("params:", params)
    // console.log("params.match:", params.match)
    // console.log("params.location.pathname:", params.location.pathname)
    // console.log("urls.base:", urls.base)
    // console.log("urls.base == params.location.pathname:", urls.base == params.location.pathname)
    const maybeRedirect =
        urls.base == params.location.pathname ? (
            <Redirect from={urls.base} to={urls.generic} exact={true} />
        ) : null
    // console.log("theLinks", theLinks)
    console.log("maybeRedirect", maybeRedirect)
    const createTab = (routeTag: string, tabTitle: string, tabs: any) => {
        const fullRoute = `${currentUrl}/${routeTag}`
        const isActive = params.location.pathname === fullRoute
        return (
            <Tabs.Tab isActive={isActive} tab={routeTag} {...tabs}>
                <Link to={fullRoute}>{tabTitle}</Link>
            </Tabs.Tab>
        )
    }
    const LinkedTab = (props: any) => {
        const { routeTag, title, ...tabs } = props
        const fullRoute = `${currentUrl}/${routeTag}`
        const isActive = params.location.pathname === fullRoute
        console.log(
            `  - LinkedTab(${routeTag}, ${fullRoute}) active: ${isActive} loc[${
                params.location.pathname
            }]`,
        )
        return (
            <Tabs.Tab isActive={isActive} tab={routeTag} {...tabs}>
                <Link to={fullRoute}>{title}</Link>
            </Tabs.Tab>
        )
    }
    console.log("ApiTesterPage.RENDERING")
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
    return (
        <div>
            <div style={styles.tabBarDiv}>
                <ul style={styles.tabBarUl}>{theLinks}</ul>
            </div>
            <Switch>{theRoutes}</Switch>
        </div>
    )
}
