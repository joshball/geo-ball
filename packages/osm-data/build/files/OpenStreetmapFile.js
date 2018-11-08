"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const FileUtils_1 = require("../utils/FileUtils");
const OpenStreetMapElements_1 = require("../data/OpenStreetMapElements");
// OSM File will have
// - OSM Server
// - OSM Query
// - OSM Query Response
// - Date
class OpenStreetmapFile {
    constructor(osmServer, osmQuery, queryDate, osmQueryResp) {
        this.osmServer = osmServer;
        this.osmQuery = osmQuery;
        this.queryDate = queryDate;
        this.osmQueryResp = osmQueryResp;
    }
    getElements() {
        return new OpenStreetMapElements_1.OpenStreetMapElements(this.osmQueryResp.elements);
    }
    // osmd.QUERYNAME[.TS?].json
    static Load(path) {
        const resolvedPath = path_1.resolve(path);
        const fileData = fs_1.readFileSync(resolvedPath, 'utf8');
        return OpenStreetmapFile.GetFileType(fileData);
    }
    static GetFileType(fileData) {
        const osmData = JSON.parse(fileData);
        if (osmData.osmServer
            && osmData.osmQuery
            && osmData.queryDate
            && osmData.osmQueryResp) {
            return new OpenStreetmapFile(osmData.osmServer, osmData.osmQuery, osmData.queryDate, osmData.osmQueryResp);
        }
        throw new Error('Not an OSM File');
    }
    static Save(path, osmFile) {
        const resolvedPath = path_1.resolve(path);
        fs_1.writeFileSync(resolvedPath, JSON.stringify(osmFile, undefined, 4));
        return resolvedPath;
    }
    static CreateFileName(fileQueryName, date) {
        const ts = date ? '.' + OpenStreetmapFile.CreateFilenameTimestamp(date) : '';
        return `${FileUtils_1.fileNamify(fileQueryName, { replacement: '_' })}${ts}.osm-data.json`;
    }
    static CreateFilenameTimestamp(date = new Date()) {
        // "2018-11-07T21:30:05.974Z" to:
        // "2018-11-07_2130.05"
        date = new Date();
        const dateString = date.toISOString();
        const split = dateString.split('T');
        if (split.length !== 2) {
            return FileUtils_1.fileNamify(dateString, { replacement: '_' });
        }
        // 21:30:05.974Z
        let time = split[1].replace(/:/g, '');
        // 213005.974Z
        time = time.substr(0, time.indexOf('.'));
        // 2153.44
        time = time.substr(0, time.length - 2) + '.' + time.substr(time.length - 2);
        return `${split[0]}_${time}`; // ​​​​​2018-11-07_2153.44
    }
}
exports.OpenStreetmapFile = OpenStreetmapFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcEZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmlsZXMvT3BlblN0cmVldG1hcEZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFDL0IsMkJBQWlEO0FBQ2pELGtEQUFnRDtBQUdoRCx5RUFBc0U7QUFJdEUscUJBQXFCO0FBQ3JCLGVBQWU7QUFDZixjQUFjO0FBQ2QsdUJBQXVCO0FBQ3ZCLFNBQVM7QUFFVCxNQUFhLGlCQUFpQjtJQU83QixZQUFZLFNBQWlCLEVBQUUsUUFBNEIsRUFBRSxTQUFpQixFQUFFLFlBQXlDO1FBQ3hILElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXO1FBQ1YsT0FBTyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELDRCQUE0QjtJQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQVk7UUFDdkIsTUFBTSxZQUFZLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sUUFBUSxHQUFHLGlCQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELE9BQU8saUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFHRCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQWdCO1FBQ2xDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFzQixDQUFDO1FBQzFELElBQUksT0FBTyxDQUFDLFNBQVM7ZUFDakIsT0FBTyxDQUFDLFFBQVE7ZUFDaEIsT0FBTyxDQUFDLFNBQVM7ZUFDakIsT0FBTyxDQUFDLFlBQVksRUFBRTtZQUN6QixPQUFPLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzNHO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQVksRUFBRSxPQUEwQjtRQUNuRCxNQUFNLFlBQVksR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsa0JBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsT0FBTyxZQUFZLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBcUIsRUFBRSxJQUFzQjtRQUNsRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzdFLE9BQU8sR0FBRyxzQkFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUM7SUFDaEYsQ0FBQztJQUVELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFhLElBQUksSUFBSSxFQUFFO1FBQ3JELGlDQUFpQztRQUNqQyx1QkFBdUI7UUFDdkIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLHNCQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFDRCxnQkFBZ0I7UUFDaEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEMsY0FBYztRQUNkLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsVUFBVTtRQUNWLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFNUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQjtJQUN6RCxDQUFDO0NBR0Q7QUFwRUQsOENBb0VDIn0=