"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const OpenStreetmapQuery_1 = require("./OpenStreetmapQuery");
const LatLng_1 = require("../utils/LatLng");
const LatLngBounds_1 = require("../utils/LatLngBounds");
// 40.71490728626142, -111.8545264005661, 40.71946109443547, -111.84929072856903
const sw = new LatLng_1.LatLng(40.71490728626142, -111.8545264005661);
const ne = new LatLng_1.LatLng(40.71946109443547, -111.84929072856903);
// 32.859375,-117.27233,32.902622,-117.20367
// const sw = new LatLng(32.859375, -117.27233)
// const ne = new LatLng(32.902622, -117.20367)
const latLngBounds = new LatLngBounds_1.LatLngBounds(sw, ne);
// test('OpenStreetmapQuery is instantiable', t => {
//     t.is(new OpenStreetmapQuery(latLngBounds)).toBeInstanceOf(OpenStreetmapQuery)
// })
ava_1.default('OpenStreetmapQuery is of type json by default', t => {
    const query = new OpenStreetmapQuery_1.OpenStreetmapQuery(latLngBounds);
    t.truthy(query.outFormat);
});
ava_1.default('OpenStreetmapQuery sets features to all highways and addr by default', t => {
    const queryString = `[out:json][timeout:180];
(
    node["highway"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
    node["addr"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
    way["highway"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
    way["addr"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
    relation["highway"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
    relation["addr"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
);
out body;
>;
out skel qt;`;
    const query = new OpenStreetmapQuery_1.OpenStreetmapQuery(latLngBounds);
    t.is(query.toString(), queryString);
    // console.log('queyr.features', query.features);
    // t.is(query.features).toMatchObject(['highways', 'addr'])
});
// it.skip('OpenStreetmapQuery sets features to all highways and addr by default', t => {
//     const queryString = `[out:json][timeout:180];
//     (
//         node["highways"="*"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//         node["addr"="*"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//         way["highways"="*"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//         way["addr"="*"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//         relation["highways"="*"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//         relation["addr"="*"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//     );
//     out body;
//     >;
//     out skel qt;`
//     const query = new OpenStreetmapQuery(latLngBounds)
//     t.is(query.toString()).toBe(queryString)
//     // console.log('queyr.features', query.features);
//     // t.is(query.features).toMatchObject(['highways', 'addr'])
// })
// [out:json][timeout:25];
// // gather results
// (
//   node["highway"]({{bbox}});
//   way["highway"]({{bbox}});
//   relation["highway"]({{bbox}});
//   node["addr"]({{bbox}});
//   way["addr"]({{bbox}});
//   relation["addr"]({{bbox}});
// );
// // print results
// out body;
// >;
// out skel qt;
// [out:json][timeout:25];
// // gather results
// (
//   node["highway"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//   way["highway"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//   relation["highway"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//   node["addr"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//   way["addr"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
//   relation["addr"](40.71490728626142,-111.8545264005661,40.71946109443547,-111.84929072856903);
// );
// // print results
// out body;
// >;
// out skel qt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcFF1ZXJ5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL09wZW5TdHJlZXRtYXBRdWVyeS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBRXZCLDZEQUEwRDtBQUMxRCw0Q0FBeUM7QUFDekMsd0RBQXFEO0FBRXJELGdGQUFnRjtBQUNoRixNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDN0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTlELDRDQUE0QztBQUM1QywrQ0FBK0M7QUFDL0MsK0NBQStDO0FBQy9DLE1BQU0sWUFBWSxHQUFHLElBQUksMkJBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFOUMsb0RBQW9EO0FBQ3BELG9GQUFvRjtBQUNwRixLQUFLO0FBRUwsYUFBSSxDQUFDLCtDQUErQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3RELE1BQU0sS0FBSyxHQUFHLElBQUksdUNBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsc0VBQXNFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDN0UsTUFBTSxXQUFXLEdBQUc7Ozs7Ozs7Ozs7O2FBV1gsQ0FBQztJQUVWLE1BQU0sS0FBSyxHQUFHLElBQUksdUNBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDcEMsaURBQWlEO0lBQ2pELDJEQUEyRDtBQUMvRCxDQUFDLENBQUMsQ0FBQztBQUVILHlGQUF5RjtBQUN6RixvREFBb0Q7QUFDcEQsUUFBUTtBQUNSLDRHQUE0RztBQUM1Ryx3R0FBd0c7QUFDeEcsMkdBQTJHO0FBQzNHLHVHQUF1RztBQUN2RyxnSEFBZ0g7QUFDaEgsNEdBQTRHO0FBQzVHLFNBQVM7QUFDVCxnQkFBZ0I7QUFDaEIsU0FBUztBQUNULG9CQUFvQjtBQUNwQix5REFBeUQ7QUFDekQsK0NBQStDO0FBQy9DLHdEQUF3RDtBQUN4RCxrRUFBa0U7QUFDbEUsS0FBSztBQUVMLDBCQUEwQjtBQUMxQixvQkFBb0I7QUFDcEIsSUFBSTtBQUNKLCtCQUErQjtBQUMvQiw4QkFBOEI7QUFDOUIsbUNBQW1DO0FBQ25DLDRCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0IsZ0NBQWdDO0FBQ2hDLEtBQUs7QUFDTCxtQkFBbUI7QUFDbkIsWUFBWTtBQUNaLEtBQUs7QUFDTCxlQUFlO0FBRWYsMEJBQTBCO0FBQzFCLG9CQUFvQjtBQUNwQixJQUFJO0FBQ0osaUdBQWlHO0FBQ2pHLGdHQUFnRztBQUNoRyxxR0FBcUc7QUFDckcsOEZBQThGO0FBQzlGLDZGQUE2RjtBQUM3RixrR0FBa0c7QUFDbEcsS0FBSztBQUNMLG1CQUFtQjtBQUNuQixZQUFZO0FBQ1osS0FBSztBQUNMLGVBQWUifQ==