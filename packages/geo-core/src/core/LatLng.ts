export class LatLng {
    lat!: number;
    lon!: number;
    constructor(lat: number, lon: number) {
        // console.log('lat/lon', lat, lon)
        this.lat = lat;
        this.lon = lon;
    }
    static FromArray(latLngArray: Array<number>) {
        return new LatLng(latLngArray[0], latLngArray[1]);
    }
    toArray(): Array<number> {
        return [this.lat, this.lon];
    }
    toString = (): string => `Lat:${this.lat}, Lon:${this.lon}`;
    valid = (): boolean => this.lat >= -90 && this.lat <= 90 && this.lon >= -180 && this.lon <= 180;
}
