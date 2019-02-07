import { LatLng, ILatLng } from './LatLng';
import { distance } from './LatLngHelpers';

export interface ILatLngBounds {
    southWest: ILatLng;
    northEast: ILatLng;
}
export class LatLngBounds {
    southWest: LatLng;
    northEast: LatLng;

    get northWest(): LatLng {
        return new LatLng(this.northEast.lat, this.southWest.lng);
    }

    get southEast(): LatLng {
        return new LatLng(this.southEast.lat, this.northEast.lng);
    }

    get latDelta(): number {
        return Math.abs(this.northEast.lat - this.southWest.lat) / 2;
    }

    get lngDelta(): number {
        return Math.abs(this.northEast.lng - this.southWest.lng) / 2;
    }

    get centerLat(): number {
        return this.northEast.lat - this.latDelta;
    }

    get centerLng(): number {
        return this.northEast.lng - this.lngDelta;
    }

    get center(): LatLng {
        return new LatLng(this.centerLat, this.centerLng);
    }

    get areaInMeters(): number {
        return this.latDistInMeters * this.lngDistInMeters;
    }

    get latDistInMeters(): number {
        return distance(this.northWest, this.southWest)
    }

    get lngDistInMeters(): number {
        return distance(this.northWest, this.southWest)
    }


    constructor(southwest: LatLng, northeast: LatLng) {
        if (!(southwest instanceof LatLng)) {
            throw new Error(`southwest is not instance of LatLng`);
        }
        if (!(northeast instanceof LatLng)) {
            throw new Error(`northeast is not instance of LatLng`);
        }
        // console.log(`LatLngBounds(): ${southwest} ${northeast}`)
        const getError = (error: string) => `LatLngBounds() ${error} (maybe mixed up your ne/sw?)`;
        if (northeast.lat < southwest.lat) {
            throw new Error(getError(`ne.lat[${northeast.lat}] < sw.lat[${southwest.lat}]`));
        }
        if (northeast.lng < southwest.lng) {
            throw new Error(getError(`ne.lng[${northeast.lng}] < sw.lng[${southwest.lng}]`));
        }
        this.northEast = new LatLng(northeast.lat, northeast.lng);
        this.southWest = new LatLng(southwest.lat, southwest.lng);
    }

    toString = (): string => `[SW:${this.southWest}],[NE:${this.northEast}]`;

    grow(by: number): any {
        this.northEast.lat += by;
        this.southWest.lat -= by;

        this.northEast.lng += by;
        this.southWest.lng -= by;
    }


    static FromBounds(bounds: ILatLngBounds, growth: number = 0) {
        const sw = new LatLng(bounds.southWest.lat - growth, bounds.southWest.lng - growth);
        const ne = new LatLng(bounds.northEast.lat + growth, bounds.northEast.lng + growth);
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
        return this.southWest.toArray().concat(this.northEast.toArray());
    }

    valid = (): boolean => this.southWest.valid() && this.northEast.valid();

    equals(rhs: ILatLngBounds): boolean {
        if (!rhs) {
            return false;
        }
        return this.southWest === rhs.southWest && this.northEast === rhs.northEast;
    }

    hashCode(): number {
        return Array.from(JSON.stringify(this))
            // tslint:disable-next-line:no-bitwise
            .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
        // return fieldsHashCode(this.latitude, this.longitude);
    }
}
