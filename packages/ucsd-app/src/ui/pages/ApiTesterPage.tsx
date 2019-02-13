import * as React from 'react'
import { css } from 'glamor'
import { Link, Redirect, Route } from 'react-router-dom'
import { colors, fonts, fontSizes, cssProps } from "../config/theme"
import { Colors, Intent, ControlGroup, Tabs, Tab } from "@blueprintjs/core";
import { CenteredContent } from '../components/common/layout/CenteredContent';
import { Text } from '../components/common/layout/Text';
import { IRouteDataEx, getRouteDataArray, ROUTE_DATA, getRouteDataEx } from '../config/routes';
import { DebugRouter } from '../app/root-component';
import { GeocodingApiPanel } from '../components/apiPanels/GeocodingApiPanel';
import { ReverseGeocodingApiPanel } from '../components/apiPanels/ReverseGeocodingApiPanel';
import { OsmDownalodApiPanel } from '../components/apiPanels/OsmDownalodApiPanel';
// const mainLayout = css({
//     // display: 'grid',
//     minHeight: 'calc(100vh - 50px)',
//     // gridTemplateRows: '100%',
//     // gridTemplateColumns: '1fr 400px',
//     // gridTemplateAreas: 'main sidebar',
// });

// const STYLE = cssProps({
//     color: colors.text,
//     fontSize: fontSizes.large,
//     fontFamily: fonts.default,
//     padding: 0,
//     margin: 0,
// })

// const LINK_STYLE = cssProps({
//     // padding: 0,
//     margin: '10px',
// })

// const buttonBarCss = cssProps({
//     // padding: 0,
//     margin: '20px',
// })

// export const getRouteButtonsLinkComp = (r: IRouteData, i: number) => (
//     <Link style={LINK_STYLE} key={i} to={r.path}>
//         <Button intent={Intent.PRIMARY} text={r.navButtonTxt} />
//     </Link>
// )




const styles: any = {}

// styles.fill = {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0
// }

// styles.content = {
//     ...styles.fill,
//     top: '40px',
//     textAlign: 'center'
// }

styles.tabBarDiv = {
    display: 'block',
    backgroundColor: Colors.LIGHT_GRAY1,
}

styles.tabBarUl = {
    padding: 0,
    margin: 0,
    //   position: 'absolute',
    top: 0,
    height: '50px',
    width: '100%',
    display: 'flex'
}

styles.tabLink = {
    color: Colors.BLACK,
    fontFamily: 'sans-serif',
}

styles.tabListItem = {
    textAlign: 'center',
    flex: 1,
    listStyleType: 'none',
    padding: '15px'
}




export const ApiTesterPage = (params: any) => {
    console.log('params', params)
    console.log('params.match', params.match)
    console.log('params.location', params.location)
    const routes = [
        getRouteDataEx(params.match.url + '/reverse-geocode', ReverseGeocodingApiPanel, 'Reverse Geocode API'),
        getRouteDataEx(params.match.url + '/geocode', GeocodingApiPanel, 'Geocode API'),
        getRouteDataEx(params.match.url + '/download', OsmDownalodApiPanel, 'OSM Download API'),
    ]
    const theRoutes = routes.map((r, i) => r.getRoute(i));
    const theLinks = routes.map((r, i) => r.getListItemLink(i, styles.tabListItem, styles.tabLink));
    return (
        <div>
            <div style={styles.tabBarDiv}>
                <ul style={styles.tabBarUl}>
                    {theLinks}
                </ul>
            </div>
            <div>
                {theRoutes}
            </div>
        </div>
    );
}
