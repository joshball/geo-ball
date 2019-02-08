import { LatLngBounds } from '@geo-ball/geo-core';
import { LocalDateTime } from '@geo-ball/utils';
export declare class GeoFileMetaData {
    bounds: LatLngBounds;
    timestamp: LocalDateTime;
    constructor(bounds: LatLngBounds, timestamp: LocalDateTime);
    static CreateEmpty(): GeoFileMetaData;
}
//# sourceMappingURL=GeoFileMetaData.d.ts.map