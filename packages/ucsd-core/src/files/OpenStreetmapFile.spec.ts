import test from 'ava';

import { OpenStreetmapFile } from './OpenStreetmapFile';
import { createNewOpenStreetmapQuery, osmJsonResp } from '../test/TestData';

test('OpenStreetmapFile is instantiable', (t) => {
	t.log('NO TESTS HERE')
	const { query } = createNewOpenStreetmapQuery();
	const newOsmFile = new OpenStreetmapFile('osmServer', query, 'queryDate', osmJsonResp);
	t.not(newOsmFile, undefined);
});
