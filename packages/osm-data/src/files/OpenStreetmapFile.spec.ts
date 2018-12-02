import test from 'ava';

import { OpenStreetmapFile } from './OpenStreetmapFile';
import { createNewOpenStreetmapFileMetaData, osmJsonResp } from '../test/TestData';

test('OpenStreetmapFile is instantiable', (t) => {
	t.log('NO TESTS HERE')
	const osmMeta = createNewOpenStreetmapFileMetaData();
	const newOsmFile = new OpenStreetmapFile(osmMeta, osmJsonResp);
	t.not(newOsmFile, undefined);
});
