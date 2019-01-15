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
    t.is(p.lon, -117.27233);
});
//# sourceMappingURL=LatLng.spec.js.map