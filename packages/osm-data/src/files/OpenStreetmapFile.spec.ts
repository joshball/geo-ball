import test from 'ava';

import { OpenStreetmapFile } from './OpenStreetmapFile';
import { createOsmFileMetaData, osmJsonResp } from '../test/TestData';

test('OpenStreetmapFile is instantiable', t => {
    t.log('NO TESTS HERE');
    const osmMeta = createOsmFileMetaData();
    const newOsmFile = new OpenStreetmapFile(osmMeta, osmJsonResp);
    t.not(newOsmFile, undefined);
});
