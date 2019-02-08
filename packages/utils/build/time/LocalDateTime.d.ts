import moment from 'moment-timezone';
export declare class LocalDateTime {
    unixTsUtcSeconds: number;
    timezoneOffset: number;
    timezoneName: string;
    readonly date: Date;
    constructor(unixTsUtcSeconds?: number, timezoneOffset?: number, timezoneName?: string);
    toString: () => string;
    toMoment: () => moment.Moment;
    fromNow: () => string;
    toISOString: () => string;
    toFilenameTimestamp: () => string;
    static FILENAME_FORMAT: string;
    static Parse(timeString: string): LocalDateTime;
    static ParseFilenameFormat(timeString: string): LocalDateTime;
    static FromDate(date: Date): LocalDateTime;
    static Now(): LocalDateTime;
}
//# sourceMappingURL=LocalDateTime.d.ts.map