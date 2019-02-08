"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const OpenStreetmapFile_1 = require("./OpenStreetmapFile");
const TestData_1 = require("../test/TestData");
ava_1.default('OpenStreetmapFile is instantiable', (t) => {
    t.log('NO TESTS HERE');
    const osmMeta = TestData_1.createOsmFileMetaData();
    const newOsmFile = new OpenStreetmapFile_1.OpenStreetmapFile(osmMeta, TestData_1.osmJsonResp);
    t.not(newOsmFile, undefined);
});
//# sourceMappingURL=OpenStreetmapFile.spec.js.map