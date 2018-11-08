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
    const { query } = TestData_1.createNewOpenStreetmapQuery();
    const newOsmFile = new OpenStreetmapFile_1.OpenStreetmapFile('osmServer', query, 'queryDate', TestData_1.osmJsonResp);
    t.not(newOsmFile, undefined);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcEZpbGUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWxlcy9PcGVuU3RyZWV0bWFwRmlsZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBRXZCLDJEQUF3RDtBQUN4RCwrQ0FBNEU7QUFFNUUsYUFBSSxDQUFDLG1DQUFtQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUN0QixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsc0NBQTJCLEVBQUUsQ0FBQztJQUNoRCxNQUFNLFVBQVUsR0FBRyxJQUFJLHFDQUFpQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLHNCQUFXLENBQUMsQ0FBQztJQUN2RixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUMsQ0FBQyJ9