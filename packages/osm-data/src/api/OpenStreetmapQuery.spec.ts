import test from 'ava';

import { OpenStreetmapQuery, IOpenStreetmapQuery } from './OpenStreetmapQuery';
import { LatLngBounds, LatLng } from '@ball-maps/geo-core';


// 40.71490728626142, -111.8545264005661, 40.71946109443547, -111.84929072856903
const sw = new LatLng(40.71490728626142, -111.8545264005661);
const ne = new LatLng(40.71946109443547, -111.84929072856903);

// 32.859375,-117.27233,32.902622,-117.20367
// const sw = new LatLng(32.859375, -117.27233)
// const ne = new LatLng(32.902622, -117.20367)
const latLngBounds = new LatLngBounds(sw, ne);
const osmQuery:IOpenStreetmapQuery = { latLngBounds };

// test('OpenStreetmapQuery is instantiable', t => {
//     t.is(new OpenStreetmapQuery(latLngBounds)).toBeInstanceOf(OpenStreetmapQuery)
// })

test('OpenStreetmapQuery is of type json by default', t => {
    const query = new OpenStreetmapQuery(osmQuery);
    t.truthy(query.outFormat);
});

test('OpenStreetmapQuery sets features to all highways and addr by default', t => {
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

    const query = new OpenStreetmapQuery(osmQuery);
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
