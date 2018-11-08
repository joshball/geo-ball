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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvTGF0TG5nLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMsOENBQXVCO0FBRXZCLGFBQUksQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUMvQyxNQUFNLENBQUMsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHNEQUFzRCxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzdELE1BQU0sQ0FBQyxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyJ9