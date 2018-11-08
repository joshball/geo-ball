"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const OpenStreetmapQuery_1 = require("./OpenStreetmapQuery");
const geo_core_1 = require("@ball-maps/geo-core");
// 40.71490728626142, -111.8545264005661, 40.71946109443547, -111.84929072856903
const sw = new geo_core_1.LatLng(40.71490728626142, -111.8545264005661);
const ne = new geo_core_1.LatLng(40.71946109443547, -111.84929072856903);
// 32.859375,-117.27233,32.902622,-117.20367
// const sw = new LatLng(32.859375, -117.27233)
// const ne = new LatLng(32.902622, -117.20367)
const latLngBounds = new geo_core_1.LatLngBounds(sw, ne);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcFF1ZXJ5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL09wZW5TdHJlZXRtYXBRdWVyeS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBRXZCLDZEQUEwRDtBQUMxRCxrREFBMkQ7QUFHM0QsZ0ZBQWdGO0FBQ2hGLE1BQU0sRUFBRSxHQUFHLElBQUksaUJBQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDN0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxpQkFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU5RCw0Q0FBNEM7QUFDNUMsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQyxNQUFNLFlBQVksR0FBRyxJQUFJLHVCQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRTlDLG9EQUFvRDtBQUNwRCxvRkFBb0Y7QUFDcEYsS0FBSztBQUVMLGFBQUksQ0FBQywrQ0FBK0MsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUN0RCxNQUFNLEtBQUssR0FBRyxJQUFJLHVDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHNFQUFzRSxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzdFLE1BQU0sV0FBVyxHQUFHOzs7Ozs7Ozs7OzthQVdYLENBQUM7SUFFVixNQUFNLEtBQUssR0FBRyxJQUFJLHVDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLGlEQUFpRDtJQUNqRCwyREFBMkQ7QUFDL0QsQ0FBQyxDQUFDLENBQUM7QUFFSCx5RkFBeUY7QUFDekYsb0RBQW9EO0FBQ3BELFFBQVE7QUFDUiw0R0FBNEc7QUFDNUcsd0dBQXdHO0FBQ3hHLDJHQUEyRztBQUMzRyx1R0FBdUc7QUFDdkcsZ0hBQWdIO0FBQ2hILDRHQUE0RztBQUM1RyxTQUFTO0FBQ1QsZ0JBQWdCO0FBQ2hCLFNBQVM7QUFDVCxvQkFBb0I7QUFDcEIseURBQXlEO0FBQ3pELCtDQUErQztBQUMvQyx3REFBd0Q7QUFDeEQsa0VBQWtFO0FBQ2xFLEtBQUs7QUFFTCwwQkFBMEI7QUFDMUIsb0JBQW9CO0FBQ3BCLElBQUk7QUFDSiwrQkFBK0I7QUFDL0IsOEJBQThCO0FBQzlCLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsMkJBQTJCO0FBQzNCLGdDQUFnQztBQUNoQyxLQUFLO0FBQ0wsbUJBQW1CO0FBQ25CLFlBQVk7QUFDWixLQUFLO0FBQ0wsZUFBZTtBQUVmLDBCQUEwQjtBQUMxQixvQkFBb0I7QUFDcEIsSUFBSTtBQUNKLGlHQUFpRztBQUNqRyxnR0FBZ0c7QUFDaEcscUdBQXFHO0FBQ3JHLDhGQUE4RjtBQUM5Riw2RkFBNkY7QUFDN0Ysa0dBQWtHO0FBQ2xHLEtBQUs7QUFDTCxtQkFBbUI7QUFDbkIsWUFBWTtBQUNaLEtBQUs7QUFDTCxlQUFlIn0=