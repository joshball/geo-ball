import { LatLngBounds, LatLng } from '@geo-ball/geo-core';
import { LocalDateTime } from '@geo-ball/utils';

export class GeoFileMetaData {
    bounds: LatLngBounds;
    timestamp: LocalDateTime;
    constructor(bounds: LatLngBounds, timestamp: LocalDateTime) {
        const sw = new LatLng(bounds.southWest.lat, bounds.southWest.lng);
        const ne = new LatLng(bounds.northEast.lat, bounds.northEast.lng);
        this.bounds = new LatLngBounds(sw, ne);
        this.timestamp = timestamp;
    }
    static CreateEmpty(): GeoFileMetaData {
        const emptyBounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));
        return new GeoFileMetaData(emptyBounds, LocalDateTime.Now());
    }
}
