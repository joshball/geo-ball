"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LatLng_1 = require("./LatLng");
const ava_1 = __importDefault(require("ava"));
ava_1.default('LatLng(32.859375, -117.27233) is valid', t => {
    const p = new LatLng_1.LatLng(32.859375, -117.27233);
    t.truthy(p.valid());
});
ava_1.default('LatLng(32.859375, -117.27233) is has correct lat/lon', t => {
    const p = new LatLng_1.LatLng(32.859375, -117.27233);
    t.is(p.lat, 32.859375);
    t.is(p.lng, -117.27233);
});
ava_1.default('LatLng(32.859375, -117.27233) reports correct precision', t => {
    const p = new LatLng_1.LatLng(32.12345, -117.123456789);
    t.deepEqual(p.precision(), {
        decPlaces: 5,
        precision: '1.11 m'
    });
});
ava_1.default('LatLng(32.859375, -117.27233) reports correct 9 place precision', t => {
    const p = new LatLng_1.LatLng(32.123456789, -117.123456789);
    t.deepEqual(p.precision(), {
        decPlaces: 9,
        precision: '< 1.11 mm'
    });
});
ava_1.default('LatLng.format returns simple precision', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(p.format({ labelFmt: '', precision: 2 }), '40.72, -111.85');
});
//# sourceMappingURL=LatLng.spec.js.map