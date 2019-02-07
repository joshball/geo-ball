"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const OpenStreetmapDownloader_1 = require("./OpenStreetmapDownloader");
const OpenStreetmapQuery_1 = require("./OpenStreetmapQuery");
const TestData_1 = require("../test/TestData");
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
ava_1.default('OpenStreetmapDownloader is instantiable', t => {
    t.not(new OpenStreetmapDownloader_1.OpenStreetmapDownloader(), undefined);
});
ava_1.default('OpenStreetmapDownloader should throw if missing bounds in query', (t) => __awaiter(this, void 0, void 0, function* () {
    // const { latLngBounds } = createNewBounds();
    const { objBounds } = TestData_1.createNewBounds();
    const osmQuery = { latLngBounds: objBounds };
    const missingBoundsQuery = new OpenStreetmapQuery_1.OpenStreetmapQuery(osmQuery);
    delete missingBoundsQuery.latLngBounds;
    t.plan(1);
    try {
        yield OpenStreetmapDownloader_1.OpenStreetmapDownloader.Fetch(missingBoundsQuery);
    }
    catch (e) {
        t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
    }
}));
ava_1.default('OpenStreetmapDownloader should throw if bad bounds in query', (t) => __awaiter(this, void 0, void 0, function* () {
    // const { latLngBounds } = createNewBounds();
    // latLngBounds.ne.lat = 200;
    const { objBounds } = TestData_1.createNewBounds();
    objBounds.northEast.lat = 200;
    const osmQuery = { latLngBounds: objBounds };
    // set lat to out of bounds (can't be bigger than 180)
    const badBoundsQuery = new OpenStreetmapQuery_1.OpenStreetmapQuery(osmQuery);
    t.plan(1);
    try {
        yield OpenStreetmapDownloader_1.OpenStreetmapDownloader.Fetch(badBoundsQuery);
    }
    catch (e) {
        t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
    }
}));
ava_1.default('OpenStreetmapDownloader should throw if API post fails', (t) => __awaiter(this, void 0, void 0, function* () {
    const mockAxios = new axios_mock_adapter_1.default(axios_1.default);
    mockAxios.onPost().networkError();
    const { query } = TestData_1.createNewOpenStreetmapQuery();
    t.plan(1);
    try {
        yield OpenStreetmapDownloader_1.OpenStreetmapDownloader.Fetch(query); // .then(r => console.log('rrrr', r)).catch(e => console.log('EEEEE:', e));
        console.log('GOT HREERERERE');
    }
    catch (e) {
        t.is(e.message, 'Network Error');
    }
}));
ava_1.default('OpenStreetmapDownloader fetch() valid data', (t) => __awaiter(this, void 0, void 0, function* () {
    const { query } = TestData_1.createNewOpenStreetmapQuery();
    const mockAxios = new axios_mock_adapter_1.default(axios_1.default);
    mockAxios.onPost().replyOnce(200, TestData_1.osmJsonResp);
    const data = yield OpenStreetmapDownloader_1.OpenStreetmapDownloader.Fetch(query);
    // console.log('data:', JSON.stringify(data, undefined, 4));
    // console.log('osmR:', JSON.stringify(osmJsonResp, undefined, 4));
    t.deepEqual(data, TestData_1.osmJsonResp);
}));
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
//# sourceMappingURL=OpenStreetmapDownloader.spec.js.map