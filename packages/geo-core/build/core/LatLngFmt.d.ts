export interface ILatLngFmt {
    quickFmt?: LatLngQuickFmt;
    coordFmt?: string;
    labelFmt?: string;
    tupleFmt?: string;
    precision?: number;
}
export declare type LatLngQuickFmt = 'array' | 'short' | 'shortLon' | 'long' | 'kvpShort' | 'kvpLong' | 'htmlShort' | 'htmlLong';
export declare const quickFormatToFullFormat: (fmt: ILatLngFmt) => void;
export declare const formatCoord: (coord: number, llFmt: ILatLngFmt, lng: boolean) => string;
export declare const formatLabel: (coord: string, llFmt: ILatLngFmt, lng: boolean) => string;
export declare const formatTuple: (lat: string, lng: string, llFmt: ILatLngFmt) => string;
export declare const formatLatLng: (lat: number, lng: number, llFmt?: ILatLngFmt | undefined) => string;
//# sourceMappingURL=LatLngFmt.d.ts.map