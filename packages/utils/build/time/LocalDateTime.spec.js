"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const LocalDateTime_1 = require("./LocalDateTime");
ava_1.default('LocalDateTime stuff', t => {
    const ldt = new LocalDateTime_1.LocalDateTime();
    console.log('() ldt.toString():', ldt.toString());
    console.log('() ldt.toString():', ldt.timezoneOffset);
    console.log('() ldt.toString():', ldt.unixTsUtcSeconds);
    t.is(ldt.timezoneName, 'America/Denver');
});
ava_1.default('LocalDateTime again', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime_1.LocalDateTime.Parse(ts);
    console.log('parse ldt.toString():', ldt.toString());
    console.log('parse ldt.toString():', ldt.timezoneOffset);
    console.log('parse ldt.toString():', ldt.unixTsUtcSeconds);
    t.is(ldt.timezoneName, 'America/Denver');
});
ava_1.default('LocalDateTime toFilenameTimestamp', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime_1.LocalDateTime.Parse(ts);
    t.is(ldt.toFilenameTimestamp(), '2013-02-08_0930.26');
});
ava_1.default('LocalDateTime ParseFilenameFormat', t => {
    const ts = '2013-02-08 09:30:26.123';
    const ldt = LocalDateTime_1.LocalDateTime.Parse(ts);
    t.is(ldt.toFilenameTimestamp(), '2013-02-08_0930.26');
    t.is(LocalDateTime_1.LocalDateTime.ParseFilenameFormat('2013-02-08_0930.26').toFilenameTimestamp(), '2013-02-08_0930.26');
    t.is(LocalDateTime_1.LocalDateTime.ParseFilenameFormat('foo2013-02-08_0930.26barfoo2014-02-08_0930.26bar').toFilenameTimestamp(), '2013-02-08_0930.26');
    t.is(LocalDateTime_1.LocalDateTime.ParseFilenameFormat('2013-02-08_0930.26').toString(), 'February 8th 2013, 9:30:26 am');
    t.is(LocalDateTime_1.LocalDateTime.ParseFilenameFormat('2013-02-08_0930.26').toISOString(), '2013-02-08T16:30:26.000Z');
});
//# sourceMappingURL=LocalDateTime.spec.js.map