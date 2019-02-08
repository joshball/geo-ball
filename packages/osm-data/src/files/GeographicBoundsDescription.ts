import { ILatLngBoundsArea } from '@geo-ball/geo-core';
import { LocalDateTime } from '@geo-ball/utils';

export interface IGeographicBoundsDescription {
    date: LocalDateTime;
    name: string;
    description: string | undefined;
    latLngBoundsArea: ILatLngBoundsArea;
    address: string | undefined;
    geocodedAddress: string | undefined;
}

export class GeographicBoundsDescription implements IGeographicBoundsDescription {

    date: LocalDateTime;
    name: string;
    description: string | undefined;
    latLngBoundsArea: ILatLngBoundsArea;
    address: string | undefined;
    geocodedAddress: string | undefined;


    constructor(geoBoundsDescr: IGeographicBoundsDescription) {
        this.date = geoBoundsDescr.date;
        this.name = geoBoundsDescr.name;
        this.description = geoBoundsDescr.description;
        this.latLngBoundsArea = geoBoundsDescr.latLngBoundsArea;
        this.address = geoBoundsDescr.address;
        this.geocodedAddress = geoBoundsDescr.geocodedAddress;
    }
}
