import { OpenStreetmapQuery, IOpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { ILatLngBounds } from '@geo-ball/geo-core';

export interface IOpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
    queryName: string;
    queryDesc: string;
    queryBoundsArea: ILatLngBounds;

}

export class OpenStreetmapFileMetaData {

    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
    queryName: string;
    queryDesc: string;
    queryBoundsArea: ILatLngBounds;

    constructor(
        osmServer: string,
        osmQuery: IOpenStreetmapQuery,
        queryName: string,
        queryDesc: string,
        queryBoundsArea: ILatLngBounds,
        queryDate: string = new Date().toISOString()) {

        this.osmServer = osmServer;
        // this.osmQuery = new OpenStreetmapQuery(osmQuery.latLngBounds, osmQuery.features, osmQuery.outFormat, osmQuery.timeoutInSec);
        this.osmQuery = new OpenStreetmapQuery(osmQuery);
        this.queryName = queryName;
        this.queryDesc = queryDesc;
        this.queryBoundsArea = queryBoundsArea;
        this.queryDate = queryDate;
    }
}
