import { LatLng } from './LatLng';
import test from 'ava';

test('LatLng(32.859375, -117.27233) is valid', t => {
    const p = new LatLng(32.859375, -117.27233);
    t.truthy(p.valid());
});

test('LatLng(32.859375, -117.27233) is has correct lat/lon', t => {
    const p = new LatLng(32.859375, -117.27233);
    t.is(p.lat, 32.859375);
    t.is(p.lon, -117.27233);
});
