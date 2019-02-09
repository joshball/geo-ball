"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const path_1 = require("path");
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
const msToSec = (num) => Math.floor(num / 1000);
// export const dateMsToSec = (date: Date): number => msToSec(date.getTime());
const dateToUnixSec = (date) => date.getTime();
const nowUnixTs = () => dateToUnixSec(new Date());
const getTzOff = (date) => date.getTimezoneOffset();
const nowTzOff = () => getTzOff(new Date());
const tzGuess = () => moment_timezone_1.default.tz.guess();
const momentToLdt = (mt) => new LocalDateTime(throwInvalid(mt).valueOf(), mt.utcOffset());
const throwInvalid = (mt) => {
    if (!mt.isValid()) {
        throw new Error(`Invalid Date string: [${mt._i}]`);
    }
    return mt;
};
const isoToSimple = (iso) => iso.replace('T', ' ').slice(0, iso.length - 1);
class LocalDateTime {
    constructor(unixUtcEpochMs = nowUnixTs(), timezoneOffset = nowTzOff(), timezoneName = tzGuess()) {
        this.toString = () => this.MTZ.format(DATETIME_TOSTRING_FORMAT);
        this.fromNow = () => this.MTZ.fromNow();
        this.toISOString = () => this.MTZ.toISOString();
        // 2019-02-04_1808.19
        this.toFilenameTimestamp = () => this.MTZ.format(FILENAME_TIMESTAMP_FORMAT);
        this.unixUtcEpochMs = unixUtcEpochMs;
        this.timezoneOffsetMin = timezoneOffset;
        this.timezoneName = timezoneName;
        this.MTZ = moment_timezone_1.default.tz(unixUtcEpochMs, timezoneName);
        // console.log('LocalDateTime()')
        // console.log('  unixUtcEpochMs:', unixUtcEpochMs);
        // console.log('  timezoneOffset:', timezoneOffset);
        // console.log('    timezoneName:', timezoneName);
        // console.log('          jsDate:', new Date(unixUtcEpochMs));
        // console.log('          moment:', this.MTZ.toString());
        // console.log('     moment.isoZ:', this.MTZ.toISOString());
        // console.log('     moment.isoL:', this.MTZ.toISOString(true));
    }
    /** JavaScript DATE */
    get jsDate() { return new Date(this.unixUtcEpochMs); }
    /** unixMs: 123452343, */
    get unixMs() { return this.unixUtcEpochMs; }
    get unixSec() { return msToSec(this.unixUtcEpochMs); }
    /** tz: 'MST', */
    get tz() { return this.MTZ.format('z'); }
    /** pretty: 'February 8th 2013, 9:30:26 am', */
    get pretty() { return this.MTZ.format(DATETIME_TOSTRING_FORMAT); }
    /** filename: '2013-02-08 0930-26', */
    get filename() { return this.MTZ.format(FILENAME_TIMESTAMP_FORMAT); }
    /** filenameUtc: '2013-02-08 1630-26Z', */
    // NOTE, you don't want to mess with the original MTZ object (by using .utc() so we copy it)
    // https://momentjs.com/docs/#/manipulating/utc/
    // https://momentjs.com/docs/#/parsing/utc/
    // While in UTC mode, all display methods will display in UTC time instead of local time
    get filenameUtc() { return moment_timezone_1.default(this.MTZ).utc().format(FILENAME_TIMESTAMP_FORMAT) + 'Z'; }
    /** iso: '2013-02-08T16:30:26.000Z', */
    get iso() { return this.MTZ.toISOString(); }
    /** isoSimple: '2013-02-08 09:30:26.000', */
    get isoSimple() { return isoToSimple(this.iso); }
    /** isoLocal: '2013-02-08T09:30:26.000-07:00', */
    get isoLocal() { return this.MTZ.toISOString(true); }
    get JSON() { return JSON.stringify(this.object, undefined, 4); }
    get object() {
        this.MTZ.toISOString();
        this.MTZ.toISOString(true);
        const o = this.MTZ.toObject();
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
    static Parse(timeString) {
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
        return momentToLdt(moment_timezone_1.default.tz(timeString, tzGuess()));
    }
    static ParseFilenameFormat(filenameTimestring) {
        // console.log('LTD.Parse timeString', timeString)
        // console.log('LTD.Parse moment(timeString): %s', moment(timeString))
        // console.log('LTD.Parse moment(timeString).unix:', moment(timeString).unix())
        // console.log('LTD.Parse moment().unix:', moment().unix())
        return momentToLdt(moment_timezone_1.default(filenameTimestring, FILENAME_TIMESTAMP_FORMAT).tz(tzGuess()));
    }
    static ParseFilenameFormatWithRegex(fullFilename, strict = false) {
        const baseFilename = path_1.basename(fullFilename);
        const result = FILENAME_TIMESTAMP_REGEX.exec(baseFilename);
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
        if (strict && fileTimestamp !== baseFilename) {
            throw new Error(`Strict mode on and Invalid Date string [${fullFilename}]`);
        }
        const localDateTime = momentToLdt(moment_timezone_1.default(fileTimestamp, FILENAME_TIMESTAMP_FORMAT).tz(tzGuess()));
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
    static FromDate(date) {
        return new LocalDateTime(dateToUnixSec(date), getTzOff(date), tzGuess());
    }
    static Now() {
        const now = new Date();
        return new LocalDateTime(dateToUnixSec(now), getTzOff(now), tzGuess());
    }
}
exports.LocalDateTime = LocalDateTime;
//# sourceMappingURL=LocalDateTime.js.map