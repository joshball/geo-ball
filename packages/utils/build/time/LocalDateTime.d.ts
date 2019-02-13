import { Moment } from 'moment-timezone';
export interface ILocalDateTimeObject {
    years: number;
    months: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    unixMs: number;
    unixSec: number;
    jsDate: Date;
    unixUtcEpochMs: number;
    timezoneOffsetMin: number;
    timezoneName: string;
    tz: string;
    pretty: string;
    filename: string;
    filenameUtc: string;
    iso: string;
    isoSimple: string;
    isoLocal: string;
}
export interface ILocalDateTime {
    unixUtcEpochMs: number;
    timezoneOffsetMin: number;
    timezoneName: string;
    MTZ: string;
}
export declare class LocalDateTime {
    /**
     * number of seconds elapsed since January 1, 1970 00:00:00 UTC.
     * moment.tz('2013-02-08T09:30:26.000-07:00', 'America/Denver').toDate().getTime()
     *      => 1360341026000
     * moment.tz(1360341026000, 'America/Denver').toDate()
     *      => Fri Feb 08 2013 09:30:26 GMT-0700 (Mountain Standard Time)
     */
    unixUtcEpochMs: number;
    /**
     * number of minutes from UTC, for instance
     * PDT => 220
     * moment.tz('2013-02-08T09:30:26.000-07:00', 'America/Denver').utcOffset() => -420
     * moment.tz('2013-02-08T09:30:26.000-07:00', 'America/Denver').format('z') => "MST"
     *
     * moment.tz('2013-06-08T09:30:26.000-07:00', 'America/Denver').utcOffset() => -360
     * moment.tz('2013-06-08T09:30:26.000-07:00', 'America/Denver').format('z') => "MDT"
     */
    timezoneOffsetMin: number;
    /**
     * Timezone name: e.g. 'America/Denver'
     */
    timezoneName: string;
    /**
     * The Moment object
     */
    MTZ: Moment;
    /** JavaScript DATE */
    readonly jsDate: Date;
    /** unixMs: 123452343, */
    readonly unixMs: number;
    readonly unixSec: number;
    /** tz: 'MST', */
    readonly tz: string;
    /** pretty: 'February 8th 2013, 9:30:26 am', */
    readonly pretty: string;
    /** filename: '2013-02-08 0930-26', */
    readonly filename: string;
    /** filenameUtc: '2013-02-08 1630-26Z', */
    readonly filenameUtc: string;
    /** iso: '2013-02-08T16:30:26.000Z', */
    readonly iso: string;
    /** isoSimple: '2013-02-08 09:30:26.000', */
    readonly isoSimple: string;
    /** isoLocal: '2013-02-08T09:30:26.000-07:00', */
    readonly isoLocal: string;
    readonly JSON: string;
    readonly object: ILocalDateTimeObject;
    constructor(unixUtcEpochMs?: number, timezoneOffset?: number, timezoneName?: string);
    toString: () => string;
    fromNow: () => string;
    toISOString: () => string;
    toFilenameTimestamp: () => string;
    static Parse(timeString: string): LocalDateTime;
    static ParseFilenameFormat(filenameTimestring: string): LocalDateTime;
    static ParseFilenameFormatWithRegex(fullFilename: string, strict?: boolean): ParsedFilenameTimestamp;
    static FromDate(date: Date): LocalDateTime;
    static Now(): LocalDateTime;
}
export interface ParsedFilenameTimestamp {
    fileTimestamp: string;
    preStr: string;
    postStr: string;
    startIndex: number;
    endIndex: number;
    fullFilename: string;
    baseFilename: string;
    localDateTime: LocalDateTime;
}
//# sourceMappingURL=LocalDateTime.d.ts.map