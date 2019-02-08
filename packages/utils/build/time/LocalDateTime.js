"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const secToMs = (num) => num * 1000;
const msToSec = (num) => Math.floor(num / 1000);
const dateMsToSec = (date) => msToSec(date.getTime());
const nowUnixTs = () => dateMsToSec(new Date());
const getTzOff = (date) => date.getTimezoneOffset();
const nowTzOff = () => getTzOff(new Date());
const localTz = () => moment_timezone_1.default.tz.guess();
const momentToLdt = (mt) => new LocalDateTime(mt.unix(), mt.utcOffset());
const ldtToMoment = (ltd) => moment_timezone_1.default(ltd.unixTsUtcSeconds, 'X');
class LocalDateTime {
    constructor(unixTsUtcSeconds = nowUnixTs(), timezoneOffset = nowTzOff(), timezoneName = localTz()) {
        this.toString = () => this.toMoment().format('MMMM Do YYYY, h:mm:ss a');
        this.toMoment = () => ldtToMoment(this);
        this.fromNow = () => this.toMoment().fromNow();
        this.toISOString = () => this.date.toISOString();
        // 2019-02-04_1808.19
        this.toFilenameTimestamp = () => this.toMoment().format(LocalDateTime.FILENAME_FORMAT);
        this.unixTsUtcSeconds = unixTsUtcSeconds;
        this.timezoneOffset = timezoneOffset;
        this.timezoneName = timezoneName;
    }
    get date() { return new Date(secToMs(this.unixTsUtcSeconds)); }
    static Parse(timeString) {
        // console.log('LTD.Parse timeString', timeString)
        // console.log('LTD.Parse moment(timeString): %s', moment(timeString))
        // console.log('LTD.Parse moment(timeString).unix:', moment(timeString).unix())
        // console.log('LTD.Parse moment().unix:', moment().unix())
        return momentToLdt(moment_timezone_1.default(timeString));
    }
    static ParseFilenameFormat(timeString) {
        // console.log('LTD.Parse timeString', timeString)
        // console.log('LTD.Parse moment(timeString): %s', moment(timeString))
        // console.log('LTD.Parse moment(timeString).unix:', moment(timeString).unix())
        // console.log('LTD.Parse moment().unix:', moment().unix())
        return momentToLdt(moment_timezone_1.default(timeString, LocalDateTime.FILENAME_FORMAT));
    }
    static FromDate(date) {
        return new LocalDateTime(dateMsToSec(date), getTzOff(date), localTz());
    }
    static Now() {
        const now = new Date();
        return new LocalDateTime(dateMsToSec(now), getTzOff(now), localTz());
    }
}
LocalDateTime.FILENAME_FORMAT = 'YYYY-MM-DD_HHmm.ss';
exports.LocalDateTime = LocalDateTime;
//# sourceMappingURL=LocalDateTime.js.map