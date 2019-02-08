import test from 'ava';
import { LocalDateTime } from './LocalDateTime';

test('LocalDateTime stuff', t => {
    const ldt = new LocalDateTime();
    console.log('() ldt.toString():',ldt.toString())
    console.log('() ldt.toString():',ldt.timezoneOffset)
    console.log('() ldt.toString():',ldt.unixTsUtcSeconds)
    t.is(ldt.timezoneName, 'America/Denver');
});

test('LocalDateTime again', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime.Parse(ts);
    console.log('parse ldt.toString():',ldt.toString())
    console.log('parse ldt.toString():',ldt.timezoneOffset)
    console.log('parse ldt.toString():',ldt.unixTsUtcSeconds)
    t.is(ldt.timezoneName, 'America/Denver');
});

test('LocalDateTime toFilenameTimestamp', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime.Parse(ts);
    t.is(ldt.toFilenameTimestamp(), '2013-02-08_0930.26');
});
test('LocalDateTime ParseFilenameFormat', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime.Parse(ts);
    t.is(ldt.toFilenameTimestamp(), '2013-02-08_0930.26');
    t.is(LocalDateTime.ParseFilenameFormat('2013-02-08_0930.26').toFilenameTimestamp(), '2013-02-08_0930.26');
    t.is(LocalDateTime.ParseFilenameFormat('foo2013-02-08_0930.26barfoo2014-02-08_0930.26bar').toFilenameTimestamp(), '2013-02-08_0930.26');
    t.is(LocalDateTime.ParseFilenameFormat('2013-02-08_0930.26').toString(), 'February 8th 2013, 9:30:26 am');
    t.is(LocalDateTime.ParseFilenameFormat('2013-02-08_0930.26').toISOString(), '2013-02-08T16:30:26.000Z');
});

