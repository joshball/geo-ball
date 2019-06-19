import { LocalDateTime } from '@geo-ball/utils';
import { LatLngBounds, LatLng } from '@geo-ball/geo-core';

import { IOpenStreetmapFileMetaData } from '../OpenStreetmapFile';

import {
    OSMFeatureKeyValuePair,
    OSMFeatureKey,
    GeographicBoundsDescription,
    IGeographicBoundsDescription,
} from '../../data';
import { OverpassQuery, IOverpassQuery } from '../../api';

export interface IOverpassQueryFileContents
    extends IOpenStreetmapFileMetaData {}

export class OverpassQueryFileContents implements IOverpassQueryFileContents {
    osmServer: string;
    osmQuery: OverpassQuery;
    queryDate: LocalDateTime;
    geoBounds: GeographicBoundsDescription;
    originalFilePath: string;
    constructor() {
        const queryName = 'CLI.queryName';
        const queryDesc = 'CLI.queryDesc';
        const query = {
            bounds: {
                southWest: {
                    lat: 40.690856387926516,
                    lng: -111.86356544494627,
                },
                northEast: {
                    lat: 40.72683597647796,
                    lng: -111.78271293640137,
                },
            },
            features: ['highway', 'addr'],
            osmEndpoint: '',
        };
        const osmQueryObj: IOverpassQuery = {
            latLngBounds: query.bounds,
            features: query.features.map(
                f => new OSMFeatureKeyValuePair(f as OSMFeatureKey)
            ),
        };
        const swLatLng = new LatLng(
            query.bounds.southWest.lat,
            query.bounds.southWest.lng
        );
        const neLatLng = new LatLng(
            query.bounds.northEast.lat,
            query.bounds.northEast.lng
        );
        const latLngBoundsArea = new LatLngBounds(swLatLng, neLatLng);
        const geoBoundsData: IGeographicBoundsDescription = {
            date: LocalDateTime.Now(),
            name: queryName,
            description: queryDesc,
            latLngBoundsArea,
            address: '123 State St, Salt Lake City, UT 84106',
            geocodedAddress: '123 State St, Salt Lake City, UT 84106',
        };
        const geoBounds = new GeographicBoundsDescription(geoBoundsData);
        this.osmServer = '';
        this.osmQuery = new OverpassQuery(osmQueryObj);
        this.geoBounds = geoBounds;
        this.queryDate = LocalDateTime.Now();
        this.originalFilePath = '';
    }
}
