import { LatLngBounds, LatLng } from '@ball-maps/geo-core';

export class GeoFileMetaData {
    bounds: LatLngBounds;
    timestamp: Date;
    constructor(bounds: LatLngBounds, timestamp: Date) {
        const sw = new LatLng(bounds.sw.lat, bounds.sw.lon);
        const ne = new LatLng(bounds.ne.lat, bounds.ne.lon);
        this.bounds = new LatLngBounds(sw, ne);
        this.timestamp = timestamp;
    }
    static CreateEmpty(): GeoFileMetaData {
        const emptyBounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));
        return new GeoFileMetaData(emptyBounds, new Date());
    }
}
