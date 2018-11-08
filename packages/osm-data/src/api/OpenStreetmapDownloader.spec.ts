import test from 'ava';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { OpenStreetmapDownloader } from './OpenStreetmapDownloader';
import { OpenStreetmapQuery } from './OpenStreetmapQuery';
import { dataDir, createNewBounds, createNewOpenStreetmapQuery, osmJsonResp } from '../test/TestData';


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
	const d = new OpenStreetmapDownloader();
	const { latLngBounds } = createNewBounds();
	const missingBoundsQuery = new OpenStreetmapQuery(latLngBounds);
	delete missingBoundsQuery.latLngBounds;
	t.plan(1);
	try {
		await d.fetch(missingBoundsQuery);
	} catch (e) {
		t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
	}
});

test('OpenStreetmapDownloader should throw if bad bounds in query', async t => {
	const d = new OpenStreetmapDownloader();
	const { latLngBounds } = createNewBounds();
	// set lat to out of bounds (can't be bigger than 180)
	latLngBounds.ne.lat = 200;
	const badBoundsQuery = new OpenStreetmapQuery(latLngBounds);
	t.plan(1);
	try {
		await d.fetch(badBoundsQuery);
	} catch (e) {
		t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
	}
});

test('OpenStreetmapDownloader should throw if API post fails', async t => {
	const mockAxios = new MockAdapter(axios);
	mockAxios.onPost().networkError();

	const { query } = createNewOpenStreetmapQuery();
	const d = new OpenStreetmapDownloader();
	t.plan(1);
	try {
		await d.fetch(query); //.then(r => console.log('rrrr', r)).catch(e => console.log('EEEEE:', e));
		console.log('GOT HREERERERE')
	} catch (e) {
		t.is(e.message, 'Network Error');
	}
});

test('OpenStreetmapDownloader fetch() valid data', async (t) => {
	const { query } = createNewOpenStreetmapQuery();
	const mockAxios = new MockAdapter(axios);
	mockAxios.onPost().replyOnce(200, osmJsonResp);
	const d = new OpenStreetmapDownloader();
	const data = await d.fetch(query);
	// console.log('data:', JSON.stringify(data, undefined, 4));
	// console.log('osmR:', JSON.stringify(osmJsonResp, undefined, 4));
	t.deepEqual(data, osmJsonResp);
})

// test('OpenStreetmapDownloader fetches and saves', async (t) => {
//     const queryName = 'query-name';
//     const fsData = {
//         data: {},
//         dataFile: `W:\\src\\__COURSES__\\ball-maps\\osm-data\\osm.data.${queryName}.json`,
//         queryFile: `W:\\src\\__COURSES__\\ball-maps\\osm-data\\osm.query.${queryName}.txt`,
//     };
//     mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }))
//     mockedFs.writeFileSync.mockImplementation(() => undefined);
//     const d = new OpenStreetmapDownloader(dataDir)
//     const data = await d.fetchAndSave(query, queryName);
//     expect(data).toEqual(fsData);
// })
