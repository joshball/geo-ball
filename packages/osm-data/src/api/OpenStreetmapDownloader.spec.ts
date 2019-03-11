import test from 'ava';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { OpenStreetmapDownloader } from './OpenStreetmapDownloader';
import { OpenStreetmapQuery, IOpenStreetmapQuery } from './OpenStreetmapQuery';
import { createNewBounds, createOsmFileMetaData, osmJsonResp, IOsmQuery } from '../test/TestData';

// test.beforeEach(_t => {
// 	mockAxios.reset();
// });
// let instance;
// let mockAxios: MockAdapter;

// test.beforeEach(_t => {
//     instance = axios.create();
//     mockAxios = new MockAdapter(instance);
//     console.log('beforeEach reset()')
// })

test('OpenStreetmapDownloader is instantiable', t => {
    t.not(new OpenStreetmapDownloader(), undefined);
});

test('OpenStreetmapDownloader should throw if missing bounds in query', async t => {
    // const { latLngBounds } = createNewBounds();
    const { objBounds } = createNewBounds();
    const osmQuery: IOpenStreetmapQuery = { latLngBounds: objBounds };
    const missingBoundsQuery = new OpenStreetmapQuery(osmQuery);
    delete missingBoundsQuery.latLngBounds;
    t.plan(1);
    try {
        await OpenStreetmapDownloader.Fetch(missingBoundsQuery);
    } catch (e) {
        t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
    }
});

test('OpenStreetmapDownloader should throw if bad bounds in query', async t => {
    // const { latLngBounds } = createNewBounds();
    // latLngBounds.ne.lat = 200;
    const { objBounds } = createNewBounds();
    objBounds.northEast.lat = 200;
    const osmQuery: IOpenStreetmapQuery = { latLngBounds: objBounds };
    // set lat to out of bounds (can't be bigger than 180)
    const badBoundsQuery = new OpenStreetmapQuery(osmQuery);
    t.plan(1);
    try {
        await OpenStreetmapDownloader.Fetch(badBoundsQuery);
    } catch (e) {
        t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
    }
});

test('OpenStreetmapDownloader should throw if API post fails', async t => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPost().networkError();

    const { osmQuery } = createOsmFileMetaData();
    t.plan(1);
    try {
        await OpenStreetmapDownloader.Fetch(osmQuery); // .then(r => console.log('rrrr', r)).catch(e => console.log('EEEEE:', e));
        console.log('GOT HREERERERE');
    } catch (e) {
        t.is(e.message, 'Network Error');
    }
});

test('OpenStreetmapDownloader fetch() valid data', async t => {
    const { osmQuery } = createOsmFileMetaData();
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPost().replyOnce(200, osmJsonResp);
    const data = await OpenStreetmapDownloader.Fetch(osmQuery);
    // console.log('data:', JSON.stringify(data, undefined, 4));
    // console.log('osmR:', JSON.stringify(osmJsonResp, undefined, 4));
    t.deepEqual(data, osmJsonResp);
});

// test('OpenStreetmapDownloader fetches and saves', async (t) => {
//     const queryName = 'query-name';
//     const fsData = {
//         data: {},
//         dataFile: `W:\\src\\__COURSES__\\geo-ball\\osm-data\\osm.data.${queryName}.json`,
//         queryFile: `W:\\src\\__COURSES__\\geo-ball\\osm-data\\osm.query.${queryName}.txt`,
//     };
//     mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }))
//     mockedFs.writeFileSync.mockImplementation(() => undefined);
//     const d = new OpenStreetmapDownloader(dataDir)
//     const data = await OpenStreetmapDownloader.FetchAndSave(query, queryName);
//     expect(data).toEqual(fsData);
// })
