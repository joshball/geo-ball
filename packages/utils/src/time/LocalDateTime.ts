import moment, { Moment } from 'moment-timezone';

const secToMs = (num: number): number => num * 1000;
const msToSec = (num: number): number => Math.floor(num / 1000);
const dateMsToSec = (date: Date): number => msToSec(date.getTime());
const nowUnixTs = (): number => dateMsToSec(new Date());
const getTzOff = (date: Date): number => date.getTimezoneOffset();
const nowTzOff = (): number => getTzOff(new Date());
const localTz = (): string => moment.tz.guess();
const momentToLdt = (mt: Moment): LocalDateTime => new LocalDateTime(mt.unix(), mt.utcOffset());
const ldtToMoment = (ltd: LocalDateTime): Moment => moment(ltd.unixTsUtcSeconds, 'X');


export class LocalDateTime {
    // number of seconds elapsed since January 1, 1970 00:00:00 UTC.
    unixTsUtcSeconds: number;
    timezoneOffset: number;
    timezoneName: string;

    get date(): Date { return new Date(secToMs(this.unixTsUtcSeconds)); }

    constructor(unixTsUtcSeconds: number = nowUnixTs(), timezoneOffset: number = nowTzOff(), timezoneName: string = localTz()) {
        this.unixTsUtcSeconds = unixTsUtcSeconds;
        this.timezoneOffset = timezoneOffset;
        this.timezoneName = timezoneName;
    }


    toString = () => this.toMoment().format('MMMM Do YYYY, h:mm:ss a');
    toMoment = () => ldtToMoment(this);
    fromNow = () => this.toMoment().fromNow();

    toISOString = () => this.date.toISOString();

    // 2019-02-04_1808.19
    toFilenameTimestamp = () => this.toMoment().format(LocalDateTime.FILENAME_FORMAT);

    public static FILENAME_FORMAT = 'YYYY-MM-DD_HHmm.ss';

    public static Parse(timeString: string) {
        // console.log('LTD.Parse timeString', timeString)
        // console.log('LTD.Parse moment(timeString): %s', moment(timeString))
        // console.log('LTD.Parse moment(timeString).unix:', moment(timeString).unix())
        // console.log('LTD.Parse moment().unix:', moment().unix())
        return momentToLdt(moment(timeString));
    }

    public static ParseFilenameFormat(timeString: string) {
        // console.log('LTD.Parse timeString', timeString)
        // console.log('LTD.Parse moment(timeString): %s', moment(timeString))
        // console.log('LTD.Parse moment(timeString).unix:', moment(timeString).unix())
        // console.log('LTD.Parse moment().unix:', moment().unix())
        return momentToLdt(moment(timeString, LocalDateTime.FILENAME_FORMAT));
    }

    public static FromDate(date: Date) {
        return new LocalDateTime(dateMsToSec(date), getTzOff(date), localTz())
    }

    public static Now() {
        const now = new Date();
        return new LocalDateTime(dateMsToSec(now), getTzOff(now), localTz())
    }

}
