"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
;
;
;
exports.createNewBounds = () => {
    const objBounds = {
        sw: {
            lat: 32.859375,
            lon: -117.27233,
        },
        ne: {
            lat: 32.902622,
            lon: -117.20367,
        }
    };
    const sw = new __1.LatLng(objBounds.sw.lat, objBounds.sw.lon);
    const ne = new __1.LatLng(objBounds.ne.lat, objBounds.ne.lon);
    const latLngBounds = new __1.LatLngBounds(sw, ne);
    return {
        objBounds,
        sw,
        ne,
        latLngBounds
    };
};
//# sourceMappingURL=TestData.js.map