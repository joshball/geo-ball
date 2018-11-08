"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const LatLng_1 = require("./LatLng");
const LatLngBounds_1 = require("./LatLngBounds");
ava_1.default('LatLng is instantiable', t => {
    const sw = new LatLng_1.LatLng(32.859375, -117.27233);
    const ne = new LatLng_1.LatLng(32.902622, -117.20367);
    const latLngBounds = new LatLngBounds_1.LatLngBounds(sw, ne);
    t.true(latLngBounds.valid());
    t.is(latLngBounds.sw.lat, 32.859375);
    t.is(latLngBounds.sw.lon, -117.27233);
    t.is(latLngBounds.ne.lat, 32.902622);
    t.is(latLngBounds.ne.lon, -117.20367);
});
ava_1.default('LatLng is checks lat bounds', t => {
    const sw = new LatLng_1.LatLng(-1, -1);
    const ne = new LatLng_1.LatLng(1, 1);
    // const latLngBounds = new LatLngBounds(ne, sw);
    // const error = t.throws(() => latLngBounds.valid(), Error);
    const error = t.throws(() => new LatLngBounds_1.LatLngBounds(ne, sw), Error);
    t.is(error.message, 'LatLngBounds() ne.lat[-1] < sw.lat[1] (maybe mixed up your ne/sw?)');
    // try {
    //     console.log('BBBB')
    //     latLngBounds.valid();
    //     console.log('NO HERE')
    //     expect(true).toBeFalsy();
    // } catch (e) {
    //     console.log('HERE')
    //     expect(e.message).toEqual();
    // }
    // console.log('CCC')
    // expect(latLngBounds.sw.lat).toEqual(-1)
    // expect(latLngBounds.sw.lon).toEqual(-1)
    // expect(latLngBounds.ne.lat).toEqual(1)
    // expect(latLngBounds.ne.lon).toEqual(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nQm91bmRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvTGF0TG5nQm91bmRzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBdUI7QUFFdkIscUNBQWtDO0FBQ2xDLGlEQUE4QztBQUU5QyxhQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDL0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsTUFBTSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU5QyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRTdCLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3BDLE1BQU0sRUFBRSxHQUFHLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLGlEQUFpRDtJQUNqRCw2REFBNkQ7SUFDN0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLDJCQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxvRUFBb0UsQ0FBQyxDQUFDO0lBQzFGLFFBQVE7SUFDUiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLDZCQUE2QjtJQUM3QixnQ0FBZ0M7SUFDaEMsZ0JBQWdCO0lBQ2hCLDBCQUEwQjtJQUMxQixtQ0FBbUM7SUFDbkMsSUFBSTtJQUNKLHFCQUFxQjtJQUVyQiwwQ0FBMEM7SUFDMUMsMENBQTBDO0lBQzFDLHlDQUF5QztJQUN6Qyx5Q0FBeUM7QUFDN0MsQ0FBQyxDQUFDLENBQUMifQ==