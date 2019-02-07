import test from 'ava';

import { LatLng } from './LatLng';
import { LatLngBounds } from './LatLngBounds';

test('LatLng is instantiable', t => {
    const sw = new LatLng(32.859375, -117.27233);
    const ne = new LatLng(32.902622, -117.20367);
    const latLngBounds = new LatLngBounds(sw, ne);

    t.true(latLngBounds.valid());

    t.is(latLngBounds.southWest.lat, 32.859375);
    t.is(latLngBounds.southWest.lng, -117.27233);
    t.is(latLngBounds.northEast.lat, 32.902622);
    t.is(latLngBounds.northEast.lng, -117.20367);
});

test('LatLng is checks lat bounds', t => {
    const sw = new LatLng(-1, -1);
    const ne = new LatLng(1, 1);
    // const latLngBounds = new LatLngBounds(ne, sw);
    // const error = t.throws(() => latLngBounds.valid(), Error);
    const error = t.throws(() => new LatLngBounds(ne, sw), Error);
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
    // expect(latLngBounds.sw.lng).toEqual(-1)
    // expect(latLngBounds.ne.lat).toEqual(1)
    // expect(latLngBounds.ne.lng).toEqual(1)
});
