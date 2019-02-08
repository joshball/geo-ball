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
export declare class GeographicBoundsDescription implements IGeographicBoundsDescription {
    date: LocalDateTime;
    name: string;
    description: string | undefined;
    latLngBoundsArea: ILatLngBoundsArea;
    address: string | undefined;
    geocodedAddress: string | undefined;
    constructor(geoBoundsDescr: IGeographicBoundsDescription);
}
//# sourceMappingURL=GeographicBoundsDescription.d.ts.map