"use strict";
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
ava_1.default('OpenStreetmapDownloader should throw if missing bounds in query', async (t) => {
    const d = new OpenStreetmapDownloader_1.OpenStreetmapDownloader();
    const { latLngBounds } = TestData_1.createNewBounds();
    const missingBoundsQuery = new OpenStreetmapQuery_1.OpenStreetmapQuery(latLngBounds);
    delete missingBoundsQuery.latLngBounds;
    t.plan(1);
    try {
        await d.fetch(missingBoundsQuery);
    }
    catch (e) {
        t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
    }
});
ava_1.default('OpenStreetmapDownloader should throw if bad bounds in query', async (t) => {
    const d = new OpenStreetmapDownloader_1.OpenStreetmapDownloader();
    const { latLngBounds } = TestData_1.createNewBounds();
    // set lat to out of bounds (can't be bigger than 180)
    latLngBounds.ne.lat = 200;
    const badBoundsQuery = new OpenStreetmapQuery_1.OpenStreetmapQuery(latLngBounds);
    t.plan(1);
    try {
        await d.fetch(badBoundsQuery);
    }
    catch (e) {
        t.is(e.message, 'OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
    }
});
ava_1.default('OpenStreetmapDownloader should throw if API post fails', async (t) => {
    const mockAxios = new axios_mock_adapter_1.default(axios_1.default);
    mockAxios.onPost().networkError();
    const { query } = TestData_1.createNewOpenStreetmapQuery();
    const d = new OpenStreetmapDownloader_1.OpenStreetmapDownloader();
    t.plan(1);
    try {
        await d.fetch(query); //.then(r => console.log('rrrr', r)).catch(e => console.log('EEEEE:', e));
        console.log('GOT HREERERERE');
    }
    catch (e) {
        t.is(e.message, 'Network Error');
    }
});
ava_1.default('OpenStreetmapDownloader fetch() valid data', async (t) => {
    const { query } = TestData_1.createNewOpenStreetmapQuery();
    const mockAxios = new axios_mock_adapter_1.default(axios_1.default);
    mockAxios.onPost().replyOnce(200, TestData_1.osmJsonResp);
    const d = new OpenStreetmapDownloader_1.OpenStreetmapDownloader();
    const data = await d.fetch(query);
    // console.log('data:', JSON.stringify(data, undefined, 4));
    // console.log('osmR:', JSON.stringify(osmJsonResp, undefined, 4));
    t.deepEqual(data, TestData_1.osmJsonResp);
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcERvd25sb2FkZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvT3BlblN0cmVldG1hcERvd25sb2FkZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF1QjtBQUV2QixrREFBMEI7QUFDMUIsNEVBQTZDO0FBRTdDLHVFQUFvRTtBQUNwRSw2REFBMEQ7QUFDMUQsK0NBQXNHO0FBR3RHLDBCQUEwQjtBQUMxQixzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLGdCQUFnQjtBQUNoQiw4QkFBOEI7QUFFOUIsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyw2Q0FBNkM7QUFDN0Msd0NBQXdDO0FBQ3hDLEtBQUs7QUFFTCxhQUFJLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDbkQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGlEQUF1QixFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsaUVBQWlFLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFFO0lBQ2pGLE1BQU0sQ0FBQyxHQUFHLElBQUksaURBQXVCLEVBQUUsQ0FBQztJQUN4QyxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsMEJBQWUsRUFBRSxDQUFDO0lBQzNDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRSxPQUFPLGtCQUFrQixDQUFDLFlBQVksQ0FBQztJQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsSUFBSTtRQUNILE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBQ2xDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDWCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsbUVBQW1FLENBQUMsQ0FB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