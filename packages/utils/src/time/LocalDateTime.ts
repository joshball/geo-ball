import moment, { Moment } from 'moment-timezone';
import { basename } from 'path';

// https://es5.github.io/x15.9.html#x15.9
// https://www.ecma-international.org/ecma-262/6.0/#sec-date.prototype.toisostring
// https://en.wikipedia.org/wiki/ISO_8601
// https://en.wikipedia.org/wiki/List_of_military_time_zones
// HI -160 Lng 160W -10     Whiskey
// CA -120 Lng 120W  -8     Uniform
// CO -105 Lng 105W  -7     Tango
// TX  -97 Lng  97W  -6     Sierra
// NY  -75 Lng  75W  -5     Romeo
// UK    0 Lng    0   0     Zulu

// .NET JSON dates are:
//  value = '\/Date(1239018869048)\/'
// var parsed = JSON.parse(data, function (key, value) {
//     if (typeof value === 'string') {
//         var d = /\/Date\((\d*)\)\//.exec(value);
//         return (d) ? new Date(+d[1]) : value;
//     }
//     return value;
// });

// https://en.wikipedia.org/wiki/Coordinated_Universal_Time
// Coordinated Universal Time (abbreviated to UTC) is the primary time standard
// by which the world regulates clocks and time. It is within about 1 second of
// mean solar time at 0° longitude and is not adjusted for daylight saving time.

// moment().toISOString()       "2019-02-09T12:44:20.987Z"
// moment().toISOString(true)   "2019-02-09T05:44:20.987-07:00"

// const secToMs = (num: number): number => num * 1000;
// const ldtToMoment = (ltd: LocalDateTime): Moment => moment(ltd.unixUtcEpochMs, UNIX_TIMESTAMP_SEC_FORMAT).tz(tzGuess());
// const ftsToMoment = (fts: string): Moment => moment(fts, FILENAME_TIMESTAMP_FORMAT).tz(tzGuess());

const UNIX_TIMESTAMP_SEC_FORMAT = 'X';
const FILENAME_TIMESTAMP_REGEX = /\d\d\d\d\-\d\d\-\d\d\s\d\d\d\d\-\d\d/g;
const FILENAME_TIMESTAMP_FORMAT = 'YYYY-MM-DD HHmm-ss';
const DATETIME_TOSTRING_FORMAT = 'MMMM Do YYYY, h:mm:ss a';
const msToSec = (num: number): number => Math.floor(num / 1000);
 // export const dateMsToSec = (date: Date): number => msToSec(date.getTime());
const dateToUnixSec = (date: Date): number => date.getTime();
const nowUnixTs = (): number => dateToUnixSec(new Date());
const getTzOff = (date: Date): number => date.getTimezoneOffset();
const nowTzOff = (): number => getTzOff(new Date());
const tzGuess = (): string => moment.tz.guess();
const momentToLdt = (mt: Moment): LocalDateTime => new LocalDateTime(throwInvalid(mt).valueOf(), mt.utcOffset());
const throwInvalid = (mt: Moment): Moment => {
 if (!mt.isValid()) { throw new Error(`Invalid Date string: [${(mt as any)._i}]`) } return mt;
 }
const isoToSimple = (iso: string): string => iso.replace('T', ' ').slice(0, iso.length - 1);

export interface ILocalDateTimeObject {
    years: number; // 2013,
    months: number; // 2,
    date: number; // 8,
    hours: number; // 9,
    minutes: number; // 30,
    seconds: number; // 26,
    milliseconds: number; // 0,
    unixMs: number; // 0,
    unixSec: number; // 0,
    jsDate: Date; // 220,
    unixUtcEpochMs: number; // 220,
    timezoneOffsetMin: number; // 220,
    timezoneName: string; // 'America/Denver',
    tz: string; // 'MST',
    pretty: string; // 'February 8th 2013, 9:30:26 am',
    filename: string; // '2013-02-08 0930-26',
    filenameUtc: string; // '2013-02-08 1630-26Z',
    iso: string; // '2013-02-08T16:30:26.000Z',
    isoSimple: string; // '2013-02-08 09:30:26.000',
    isoLocal: string; // '2013-02-08T09:30:26.000-07:00',
}



export class LocalDateTime {
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
    MTZ: Moment

    /** JavaScript DATE */
    get jsDate(): Date { return new Date(this.unixUtcEpochMs); }

    /** unixMs: 123452343, */
    get unixMs(): number { return this.unixUtcEpochMs; }
    get unixSec(): number { return msToSec(this.unixUtcEpochMs); }

    /** tz: 'MST', */
    get tz(): string { return this.MTZ.format('z'); }

    /** pretty: 'February 8th 2013, 9:30:26 am', */
    get pretty(): string { return this.MTZ.format(DATETIME_TOSTRING_FORMAT); }

    /** filename: '2013-02-08 0930-26', */
    get filename(): string { return this.MTZ.format(FILENAME_TIMESTAMP_FORMAT); }

    /** filenameUtc: '2013-02-08 1630-26Z', */
    // NOTE, you don't want to mess with the original MTZ object (by using .utc() so we copy it)
    // https://momentjs.com/docs/#/manipulating/utc/
    // https://momentjs.com/docs/#/parsing/utc/
    // While in UTC mode, all display methods will display in UTC time instead of local time
    get filenameUtc(): string { return moment(this.MTZ).utc().format(FILENAME_TIMESTAMP_FORMAT) + 'Z'; }

    /** iso: '2013-02-08T16:30:26.000Z', */
    get iso(): string { return this.MTZ.toISOString(); }

    /** isoSimple: '2013-02-08 09:30:26.000', */
    get isoSimple(): string { return isoToSimple(this.iso); }

    /** isoLocal: '2013-02-08T09:30:26.000-07:00', */
    get isoLocal(): string { return this.MTZ.toISOString(true); }

    get JSON(): string { return JSON.stringify(this.object, undefined, 4); }

    get object(): ILocalDateTimeObject {
        this.MTZ.toISOString();
        this.MTZ.toISOString(true);
        const o = this.MTZ.toObject() as ILocalDateTimeObject;
        o.unixMs = this.unixMs;
        o.unixSec = this.unixSec;
        o.jsDate = this.jsDate;
        o.unixUtcEpochMs = this.unixUtcEpochMs;
        o.timezoneOffsetMin = this.timezoneOffsetMin;
        o.timezoneName = this.timezoneName;
        o.tz = this.tz;
        o.pretty = this.pretty;
        o.filename = this.filename;
        o.filenameUtc = this.filenameUtc;
        o.iso = this.iso;
        o.isoSimple = this.isoSimple;
        o.isoLocal = this.isoLocal;
        return o;
    }

    constructor(unixUtcEpochMs: number = nowUnixTs(), timezoneOffset: number = nowTzOff(), timezoneName: string = tzGuess()) {
        this.unixUtcEpochMs = unixUtcEpochMs;
        this.timezoneOffsetMin = timezoneOffset;
        this.timezoneName = timezoneName;
        this.MTZ = moment.tz(unixUtcEpochMs, timezoneName);
        // console.log('LocalDateTime()')
        // console.log('  unixUtcEpochMs:', unixUtcEpochMs);
        // console.log('  timezoneOffset:', timezoneOffset);
        // console.log('    timezoneName:', timezoneName);
        // console.log('          jsDate:', new Date(unixUtcEpochMs));
        // console.log('          moment:', this.MTZ.toString());
        // console.log('     moment.isoZ:', this.MTZ.toISOString());
        // console.log('     moment.isoL:', this.MTZ.toISOString(true));
    }


    toString = () => this.MTZ.format(DATETIME_TOSTRING_FORMAT);
    fromNow = () => this.MTZ.fromNow();
    toISOString = () => this.MTZ.toISOString();

    // 2019-02-04_1808.19
    toFilenameTimestamp = () => this.MTZ.format(FILENAME_TIMESTAMP_FORMAT);


    public static Parse(timeString: string): LocalDateTime {
        // const x = moment(timeString);
        // const z = moment.tz(timeString, tzGuess());
        // const y = momentToLdt(x);
        // console.log('')
        // console.log('----------------- PARSE -----------------')
        // console.log('LTD.Parse timeString', timeString)
        // console.log('LTD.Parse moment(timeString): %s', x)
        // console.log('LTD.Parse moment(timeString).unix:', x.unix())
        // console.log('LTD.Parse y.unixUtcEpochMs:', y.unixUtcEpochMs)
        // console.log('LTD.Parse y.timezoneOffsetMin:', y.timezoneOffsetMin)
        // console.log('LTD.Parse y.timezoneName:', y.timezoneName)
        // console.log('LTD.Parse z.timezoneName:', z.toString())
        // console.log('LTD.Parse z.localTz:', tzGuess())
        // console.log('LTD.Parse z.Z:', z.format('Z'))
        // console.log('LTD.Parse z.z:', z.format('z'))
        // console.log('LTD.Parse x.Z:', x.format('Z'))
        // console.log('LTD.Parse x.z:', x.format('z'))

        return momentToLdt(moment.tz(timeString, tzGuess()));
    }

    public static ParseFilenameFormat(filenameTimestring: string): LocalDateTime {
        // console.log('LTD.Parse timeString', timeString)
        // console.log('LTD.Parse moment(timeString): %s', moment(timeString))
        // console.log('LTD.Parse moment(timeString).unix:', moment(timeString).unix())
        // console.log('LTD.Parse moment().unix:', moment().unix())
        return momentToLdt(moment(filenameTimestring, FILENAME_TIMESTAMP_FORMAT).tz(tzGuess()));
    }


    public static ParseFilenameFormatWithRegex(fullFilename: string, strict: boolean = false): ParsedFilenameTimestamp {
        const baseFilename = basename(fullFilename);
        const result = FILENAME_TIMESTAMP_REGEX.exec(baseFilename) as RegExpExecArray;
        if (!result) {
            throw new Error(`Invalid Date string [${fullFilename}]`);
        }

        // console.log(result);
        // [   '2019-02-04_1808.19',
        //     index: 3,
        //     input: 'foo2019-02-04_1808.19barfoo2019-02-04_1808.19bar',
        //     groups: undefined
        // ]
        const fileTimestamp = result[0];
        if(strict && fileTimestamp !== baseFilename){
            throw new Error(`Strict mode on and Invalid Date string [${fullFilename}]`);
        }
        const localDateTime = momentToLdt(moment(fileTimestamp, FILENAME_TIMESTAMP_FORMAT).tz(tzGuess()));
        const startIndex = result.index;
        const endIndex = startIndex + fileTimestamp.length;

        return {
            fileTimestamp,
            startIndex,
            preStr: baseFilename.substr(0, startIndex),
            postStr: baseFilename.substr(endIndex),
            endIndex,
            fullFilename,
            baseFilename,
            localDateTime,
        };
    }

    public static FromDate(date: Date): LocalDateTime {
        return new LocalDateTime(dateToUnixSec(date), getTzOff(date), tzGuess())
    }

    public static Now(): LocalDateTime {
        const now = new Date();
        return new LocalDateTime(dateToUnixSec(now), getTzOff(now), tzGuess())
    }

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
