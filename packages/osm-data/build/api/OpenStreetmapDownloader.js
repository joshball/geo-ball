"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const path_1 = require("path");
const fs_1 = require("fs");
const OpenStreetmapFile_1 = require("../files/OpenStreetmapFile");
// https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
const OverPassApiEndpoints = {
    main: 'http://overpass-api.de/api/interpreter',
    lz4: 'https://lz4.overpass-api.de/api/interpreter',
    z: 'https://z.overpass-api.de/api/interpreter',
    fr: 'http://overpass.openstreetmap.fr/api/interpreter',
    kumi: 'https://overpass.kumi.systems/api/interpreter',
};
const DEFAULT_ENDPOINT = OverPassApiEndpoints.main;
class OpenStreetmapDownloader {
    constructor(endpoint) {
        this.endpoint = endpoint || DEFAULT_ENDPOINT;
    }
    fetch(query) {
        if (!query.latLngBounds || !query.latLngBounds.valid()) {
            throw new Error('OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
        }
        const url = this.endpoint;
        const osmFormattedQuery = query.toString();
        // const url = 'http://localhost:1234';
        console.log('overpass query:', osmFormattedQuery);
        console.log('\noverpass url:', url);
        return axios_1.default.post(url, osmFormattedQuery).then(response => {
            // console.log('axios.post:', response.status);
            // console.log('axios.post response.data:', response.data);
            // console.log('axios.post response:', response);
            return response.data;
        });
    }
    fetchAndSave(query, osmDataFilePath, overwriteFile = false) {
        osmDataFilePath = path_1.resolve(osmDataFilePath);
        if (!overwriteFile && fs_1.existsSync(osmDataFilePath)) {
            throw new Error(`File exists [${osmDataFilePath}]`);
        }
        const now = new Date();
        return this.fetch(query).then(data => {
            const osmDataFile = new OpenStreetmapFile_1.OpenStreetmapFile(this.endpoint, query, now.toISOString(), data);
            fs_1.writeFileSync(osmDataFilePath, JSON.stringify(osmDataFile, undefined, 4));
            return {
                osmDataFile,
                osmDataFilePath,
            };
        });
    }
}
exports.OpenStreetmapDownloader = OpenStreetmapDownloader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcERvd25sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL09wZW5TdHJlZXRtYXBEb3dubG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLCtCQUErQjtBQUMvQiwyQkFBK0M7QUFFL0Msa0VBQStEO0FBRy9ELGlGQUFpRjtBQUNqRixNQUFNLG9CQUFvQixHQUFHO0lBQzVCLElBQUksRUFBRSx3Q0FBd0M7SUFDOUMsR0FBRyxFQUFFLDZDQUE2QztJQUNsRCxDQUFDLEVBQUUsMkNBQTJDO0lBQzlDLEVBQUUsRUFBRSxrREFBa0Q7SUFDdEQsSUFBSSxFQUFFLCtDQUErQztDQUNyRCxDQUFDO0FBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7QUFPbkQsTUFBYSx1QkFBdUI7SUFHbkMsWUFBWSxRQUFpQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxnQkFBZ0IsQ0FBQztJQUM5QyxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQXlCO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2RCxNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7U0FDckY7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFCLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTNDLHVDQUF1QztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUE7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pELCtDQUErQztZQUMvQywyREFBMkQ7WUFDM0QsaURBQWlEO1lBQ2pELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSxZQUFZLENBQUMsS0FBeUIsRUFBRSxlQUF1QixFQUFFLGdCQUF5QixLQUFLO1FBQ3JHLGVBQWUsR0FBRyxjQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsSUFBSSxlQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsZUFBZSxHQUFHLENBQUMsQ0FBQztTQUNwRDtRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxNQUFNLFdBQVcsR0FBRyxJQUFJLHFDQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6RixrQkFBYSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRSxPQUFPO2dCQUNOLFdBQVc7Z0JBQ1gsZUFBZTthQUNmLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQXhDRCwwREF3Q0MifQ==