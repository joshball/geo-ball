import { LatLng } from './LatLng';

export class LatLngBounds {
    sw: LatLng;
    ne: LatLng;

    constructor(southwest: LatLng, northeast: LatLng) {
        // console.log(`LatLngBounds(): ${southwest} ${northeast}`)
        const getError = (error: string) => `LatLngBounds() ${error} (maybe mixed up your ne/sw?)`;
        if (northeast.lat < southwest.lat) {
            throw new Error(getError(`ne.lat[${northeast.lat}] < sw.lat[${southwest.lat}]`));
        }
        if (northeast.lon < southwest.lon) {
            throw new Error(getError(`ne.lon[${northeast.lon}] < sw.lon[${southwest.lon}]`));
        }
        this.ne = new LatLng(northeast.lat, northeast.lon);
        this.sw = new LatLng(southwest.lat, southwest.lon);
    }

    toString = (): string => `[SW:${this.sw}],[NE:${this.ne}]`;

    grow(by: number): any {
        this.ne.lat += by;
        this.sw.lat -= by;

        this.ne.lon += by;
        this.sw.lon -= by;
    }
    static FromBounds(bounds: LatLngBounds, growth: number = 0) {
        const sw = new LatLng(bounds.sw.lat - growth, bounds.sw.lon - growth);
        const ne = new LatLng(bounds.ne.lat + growth, bounds.ne.lon + growth);
        return new LatLngBounds(sw, ne);
    }
    static FromArray(bounds: Array<number>) {
        if (bounds.length !== 4) {
            throw new Error(
                `bounds array must be four elements (south[lat], west[lon], north[lat], east[lon])`
            );
        }
        const southLat = bounds[0];
        const westLon = bounds[1];
        const northLat = bounds[2];
        const eastLon = bounds[3];

        const sw = new LatLng(southLat, westLon);
        const ne = new LatLng(northLat, eastLon);
        return new LatLngBounds(sw, ne);
    }

    static FromNumbers(southLat: number, westLon: number, northLat: number, eastLon: number) {
        const sw = new LatLng(southLat, westLon);
        const ne = new LatLng(northLat, eastLon);
        return new LatLngBounds(sw, ne);
    }

    toArray(): Array<number> {
        return this.sw.toArray().concat(this.ne.toArray());
    }

    valid = (): boolean => this.sw.valid() && this.ne.valid();
}
