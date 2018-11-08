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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nQm91bmRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9MYXRMbmdCb3VuZHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF1QjtBQUV2QixxQ0FBa0M7QUFDbEMsaURBQThDO0FBRTlDLGFBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUMvQixNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxNQUFNLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDcEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUIsaURBQWlEO0lBQ2pELDZEQUE2RDtJQUM3RCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksMkJBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLG9FQUFvRSxDQUFDLENBQUM7SUFDMUYsUUFBUTtJQUNSLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsNkJBQTZCO0lBQzdCLGdDQUFnQztJQUNoQyxnQkFBZ0I7SUFDaEIsMEJBQTBCO0lBQzFCLG1DQUFtQztJQUNuQyxJQUFJO0lBQ0oscUJBQXFCO0lBRXJCLDBDQUEwQztJQUMxQywwQ0FBMEM7SUFDMUMseUNBQXlDO0lBQ3pDLHlDQUF5QztBQUM3QyxDQUFDLENBQUMsQ0FBQyJ9