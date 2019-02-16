import * as React from 'react'
import { Colors } from "@blueprintjs/core";
import { createRouteCoreData, IRouteCoreData } from '../config/routes';
import { GeocodingApiPanel } from '../components/apiPanels/GeocodingApiPanel';
import { ReverseGeocodingApiPanel } from '../components/apiPanels/ReverseGeocodingApiPanel';
import { OsmDownalodApiPanel } from '../components/apiPanels/OsmDownalodApiPanel';

const styles: any = {}

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
    const routes: Array<IRouteCoreData> = [
        createRouteCoreData(params.match.url + '/reverse-geocode', ReverseGeocodingApiPanel, { linkLabel: 'Reverse Geocode API'}),
        createRouteCoreData(params.match.url + '/geocode', GeocodingApiPanel, { linkLabel: 'Geocode API'}),
        createRouteCoreData(params.match.url + '/download', OsmDownalodApiPanel, { linkLabel: 'OSM Download API'}),
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
