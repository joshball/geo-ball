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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9MYXRMbmcuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFrQztBQUNsQyw4Q0FBdUI7QUFFdkIsYUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQy9DLE1BQU0sQ0FBQyxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsc0RBQXNELEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDN0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIn0=