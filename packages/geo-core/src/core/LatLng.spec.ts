import { LatLng } from './LatLng';
import test from 'ava';

test('LatLng(32.859375, -117.27233) is valid', t => {
    const p = new LatLng(32.859375, -117.27233);
    t.truthy(p.valid());
});

test('LatLng(32.859375, -117.27233) is has correct lat/lon', t => {
    const p = new LatLng(32.859375, -117.27233);
    t.is(p.lat, 32.859375);
    t.is(p.lng, -117.27233);
});

test('LatLng(32.859375, -117.27233) reports correct precision', t => {
    const p = new LatLng(32.12345, -117.123456789);

    t.deepEqual(p.precision(), {
        decPlaces: 5,
        precision: '1.11 m',
    });
});

test('LatLng(32.859375, -117.27233) reports correct 9 place precision', t => {
    const p = new LatLng(32.123456789, -117.123456789);
    t.deepEqual(p.precision(), {
        decPlaces: 9,
        precision: '< 1.11 mm',
    });
});

test('LatLng.format returns simple precision', t => {
    const p = new LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(p.format({ labelFmt: '', precision: 2 }), '40.72, -111.85');
});
