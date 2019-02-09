"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const LocalDateTime_1 = require("./LocalDateTime");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const PARSED_DATE = {
    years: 2013,
    months: 1,
    date: 8,
    hours: 9,
    minutes: 30,
    seconds: 26,
    milliseconds: 123,
    unixMs: 1360341026123,
    unixSec: 1360341026,
    jsDate: new Date(1360341026123),
    unixUtcEpochMs: 1360341026123,
    timezoneOffsetMin: -420,
    timezoneName: 'America/Denver',
    tz: 'MST',
    pretty: 'February 8th 2013, 9:30:26 am',
    filename: '2013-02-08 0930-26',
    filenameUtc: '2013-02-08 1630-26Z',
    iso: '2013-02-08T16:30:26.123Z',
    isoSimple: '2013-02-08 16:30:26.123',
    // isoLocal: '2013-02-08T16:30:26.123+00:00'
    isoLocal: '2013-02-08T09:30:26.123-07:00'
};
ava_1.default.beforeEach(_t => {
    moment_timezone_1.default.suppressDeprecationWarnings = true;
});
ava_1.default.afterEach(_t => {
    moment_timezone_1.default.suppressDeprecationWarnings = true;
});
ava_1.default('LocalDateTime constructs correct time (brittle)', t => {
    const ldt = new LocalDateTime_1.LocalDateTime();
    const date = new Date();
    // console.log('() ldt.toString():', ldt.toString())
    // console.log('() date.toString():', date.toString())
    // console.log('Math.round(ldt.unixUtcEpochMs/10):', Math.round(ldt.unixUtcEpochMs/10))
    // console.log(' Math.round(date.getTime()/10000):',  Math.round(date.getTime()/10000))
    // console.log('ldt.unixUtcEpochMs:', ldt.unixUtcEpochMs)
    // console.log('date.getTime()):',  date.getTime())
    // console.log('() date.getTimezoneOffset():', date.getTimezoneOffset())
    // console.log('() ldt.toString():', ldt.timezoneOffsetMin)
    // console.log('() ldt.toString():', ldt.unixTsUtcSeconds)
    // console.log('ldt:', ldt.JSON);
    //
    // Because the dates were created at different times, lets round the milliseconds
    t.is(Math.round(ldt.unixUtcEpochMs / 1000), Math.round(date.getTime() / 1000));
    t.is(ldt.object.years, date.getFullYear());
    t.is(ldt.timezoneOffsetMin, date.getTimezoneOffset());
});
ava_1.default('LocalDateTime.Parse() differentiates milliseconds', t => {
    const ldtOne = LocalDateTime_1.LocalDateTime.Parse('2013-02-08T16:30:26.123Z');
    const ldtTwo = LocalDateTime_1.LocalDateTime.Parse('2013-02-08T16:30:26.124Z');
    t.not(ldtOne.unixUtcEpochMs, ldtTwo.unixUtcEpochMs);
    t.is(ldtOne.unixUtcEpochMs + 1, ldtTwo.unixUtcEpochMs);
    t.is(ldtOne.unixUtcEpochMs, 1360341026123);
    t.is(ldtTwo.unixUtcEpochMs, 1360341026124);
    t.is(ldtTwo.unixSec, 1360341026);
});
ava_1.default('LocalDateTime.Parse() can parse ISO local string', t => {
    const tsOne = '2013-02-08T09:30:26.123-07:00';
    const ldtOne = LocalDateTime_1.LocalDateTime.Parse(tsOne);
    t.is(ldtOne.unixUtcEpochMs, 1360341026123);
    t.is(ldtOne.isoLocal, tsOne);
    t.deepEqual(ldtOne.object, PARSED_DATE);
});
ava_1.default('LocalDateTime.Parse() can parse ISO string as UTC', t => {
    const tsOne = '2013-02-08T16:30:26.123Z';
    const ldtOne = LocalDateTime_1.LocalDateTime.Parse(tsOne);
    t.is(ldtOne.unixUtcEpochMs, 1360341026123);
    t.is(ldtOne.isoLocal, '2013-02-08T09:30:26.123-07:00');
    t.deepEqual(ldtOne.object, PARSED_DATE);
});
ava_1.default('LocalDateTime.Parse() parses ISO simple string as LOCAL not UTC', t => {
    const tsOne = '2013-02-08 09:30:26.123';
    const ldtOne = LocalDateTime_1.LocalDateTime.Parse(tsOne);
    t.is(ldtOne.unixUtcEpochMs, 1360341026123);
    t.is(ldtOne.isoLocal, '2013-02-08T09:30:26.123-07:00');
    t.deepEqual(ldtOne.object, PARSED_DATE);
});
ava_1.default('LocalDateTime.toFilenameTimestamp() creates correct name', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime_1.LocalDateTime.Parse(ts);
    t.is(ldt.toFilenameTimestamp(), '2013-02-08 0930-26');
});
ava_1.default('LocalDateTime.FromDate() creates correct name and JSON', t => {
    const ldt = LocalDateTime_1.LocalDateTime.FromDate(PARSED_DATE.jsDate);
    t.is(JSON.parse(ldt.JSON).unixMs, ldt.object.unixMs);
    t.is(ldt.toFilenameTimestamp(), '2013-02-08 0930-26');
});
ava_1.default('LocalDateTime.Parse() throws with bad input', t => {
    const ts = 'arggggg';
    const error = t.throws(() => LocalDateTime_1.LocalDateTime.Parse(ts));
    t.is(error.message, 'Invalid Date string: [arggggg]');
});
ava_1.default('LocalDateTime.toFilenameTimestamp() creates correct filename timestamp', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime_1.LocalDateTime.Parse(ts);
    t.is(ldt.toFilenameTimestamp(), '2013-02-08 0930-26');
    const yag = ldt.fromNow();
    const hasYearag = yag.indexOf('years ago');
    t.true(hasYearag > 0);
});
ava_1.default('LocalDateTime Now seems to work', t => {
    const ts = '2013-02-08 0930-26';
    const now = new Date();
    const ldt = LocalDateTime_1.LocalDateTime.Now();
    t.is(ldt.object.minutes, now.getMinutes());
});
ava_1.default('LocalDateTime ParseFilenameFormat parses the filenname correctly', t => {
    const ts = '2013-02-08 0930-26';
    const ldt = LocalDateTime_1.LocalDateTime.ParseFilenameFormat(ts);
    // Invalid Date string: [2013-02-08 0930-26]
    t.is(ldt.toString(), 'February 8th 2013, 9:30:26 am');
    t.is(ldt.toISOString(), '2013-02-08T16:30:26.000Z');
});
ava_1.default('LocalDateTime ParseFilenameFormat parses the filenname with extra correctly', t => {
    const ts = 'xxxx2013-2-08 0930-26xxxxx';
    const ldt = LocalDateTime_1.LocalDateTime.ParseFilenameFormat(ts);
    // Invalid Date string: [2013-02-08 0930-26]
    t.is(ldt.toISOString(), '2013-02-08T16:30:26.000Z');
    t.is(ldt.toFilenameTimestamp(), '2013-02-08 0930-26');
});
ava_1.default('LocalDateTime ParseFilenameFormatWithRegex parses the filename with extra correctly', t => {
    const ts = 'c:\\tmp\\some-prefix-2013-02-08 0930-26some-postfix.json';
    const pfnts = LocalDateTime_1.LocalDateTime.ParseFilenameFormatWithRegex(ts);
    // Invalid Date string: [2013-02-08 0930-26]
    t.is(pfnts.localDateTime.toISOString(), '2013-02-08T16:30:26.000Z');
    t.is(pfnts.localDateTime.toFilenameTimestamp(), '2013-02-08 0930-26');
    t.is(pfnts.baseFilename, 'some-prefix-2013-02-08 0930-26some-postfix.json');
    t.is(pfnts.fullFilename, ts);
    t.is(pfnts.startIndex, 12);
    t.is(pfnts.endIndex, 30);
    t.is(pfnts.preStr, 'some-prefix-');
    t.is(pfnts.postStr, 'some-postfix.json');
});
ava_1.default('LocalDateTime ParseFilenameFormatWithRegex throws when parsing in strict mode', t => {
    const ts = 'c:\\tmp\\some-prefix-2013-02-08 0930-26some-postfix.json';
    const error = t.throws(() => LocalDateTime_1.LocalDateTime.ParseFilenameFormatWithRegex(ts, true));
    t.is(error.message, `Invalid Date string [${ts}]`);
});
ava_1.default('LocalDateTime ParseFilenameFormatWithRegex throws when bad input', t => {
    const ts = 'xxxx2013-2-08 0930-26xxxxx';
    const error = t.throws(() => LocalDateTime_1.LocalDateTime.ParseFilenameFormatWithRegex(ts));
    t.is(error.message, 'Invalid Date string [xxxx2013-2-08 0930-26xxxxx]');
});
ava_1.default('LocalDateTime ParseFilenameFormatWithRegex throws when bad input and strict', t => {
    const ts = 'xxxx2013-02-08 0930-26xxxxx';
    const error = t.throws(() => LocalDateTime_1.LocalDateTime.ParseFilenameFormatWithRegex(ts, true));
    t.is(error.message, 'Strict mode on and Invalid Date string [xxxx2013-02-08 0930-26xxxxx]');
});
//# sourceMappingURL=LocalDateTime.spec.js.map