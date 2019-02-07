import { LatLngBounds, LatLng } from '@geo-ball/geo-core';

export class GeoFileMetaData {
    bounds: LatLngBounds;
    timestamp: Date;
    constructor(bounds: LatLngBounds, timestamp: Date) {
        const sw = new LatLng(bounds.southWest.lat, bounds.southWest.lng);
        const ne = new LatLng(bounds.northEast.lat, bounds.northEast.lng);
        this.bounds = new LatLngBounds(sw, ne);
        this.timestamp = timestamp;
    }
    static CreateEmpty(): GeoFileMetaData {
        const emptyBounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));
        return new GeoFileMetaData(emptyBounds, new Date());
    }
}
