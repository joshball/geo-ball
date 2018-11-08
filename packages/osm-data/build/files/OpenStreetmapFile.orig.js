"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const FileUtils_1 = require("../utils/FileUtils");
// OSM File will have
// - OSM Server
// - OSM Query
// - ?curl command
// - Date
// - OSM Query Response
// - OSM Query Response Type (JSON|GeoJSON)
class OpenStreetmapFile {
    constructor(path, type, data) {
        this.path = path;
        this.type = type;
        this.data = data;
    }
    static CreateFilenameTimestamp(date = new Date()) {
        return FileUtils_1.fileNamify(date.toISOString());
    }
    static Load(path) {
        const resolvedPath = path_1.resolve(path);
        const fileData = fs_1.readFileSync(resolvedPath, 'utf8');
        return OpenStreetmapFile.GetFileType(resolvedPath, fileData);
    }
    static GetFileType(path, fileData) {
        return OpenStreetmapFile.TryJsonType(path, fileData)
            || OpenStreetmapFile.TryTextType(path, fileData)
            || new OpenStreetmapFile(path, 'Unknown', fileData);
    }
    static TryJsonType(path, fileData) {
        try {
            const osmData = JSON.parse(fileData);
            return OpenStreetmapFile.TryDataJsonType(path, osmData)
                || OpenStreetmapFile.TryGeoJsonType(path, osmData)
                || new OpenStreetmapFile(path, 'UnknownJson', fileData);
        }
        catch (error) {
            return undefined;
        }
    }
    static TryDataJsonType(path, jsonData) {
        if (jsonData.version
            && jsonData.osm3s
            && jsonData.elements
            && jsonData.elements.length) {
            new OpenStreetmapFile(path, 'OsmDataJson', jsonData);
        }
    }
    static TryGeoJsonType(path, jsonData) {
        if (jsonData.type === 'FeatureCollection'
            && jsonData.features
            && jsonData.features.length) {
            new OpenStreetmapFile(path, 'OsmDataGeoJson', jsonData);
        }
    }
    static TryTextType(path, fileData) {
        // switch (extname(path)) {
        // 	case '.txt':
        // }
        const foundNode = fileData.indexOf('node[');
        const foundWay = fileData.indexOf('way[');
        const foundRelation = fileData.indexOf('relation[');
        if (foundNode || foundWay || foundRelation) {
            return new OpenStreetmapFile(path, 'OsmQueryTxt', fileData);
        }
    }
}
exports.OpenStreetmapFile = OpenStreetmapFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcEZpbGUub3JpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWxlcy9PcGVuU3RyZWV0bWFwRmlsZS5vcmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBQy9CLDJCQUFrQztBQUNsQyxrREFBZ0Q7QUFjaEQscUJBQXFCO0FBQ3JCLGVBQWU7QUFDZixjQUFjO0FBQ2Qsa0JBQWtCO0FBQ2xCLFNBQVM7QUFDVCx1QkFBdUI7QUFDdkIsMkNBQTJDO0FBRTNDLE1BQWEsaUJBQWlCO0lBSzdCLFlBQVksSUFBWSxFQUFFLElBQTJCLEVBQUUsSUFBUztRQUMvRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsTUFBTSxDQUFDLHVCQUF1QixDQUFDLE9BQWEsSUFBSSxJQUFJLEVBQUU7UUFDckQsT0FBTyxzQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQVk7UUFDdkIsTUFBTSxZQUFZLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sUUFBUSxHQUFHLGlCQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELE9BQU8saUJBQWlCLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFZLEVBQUUsUUFBZ0I7UUFDaEQsT0FBTyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztlQUNoRCxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztlQUM3QyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBWSxFQUFFLFFBQWdCO1FBQ2hELElBQUk7WUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8saUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7bUJBQ25ELGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO21CQUMvQyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDekQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLE9BQU8sU0FBUyxDQUFDO1NBQ2pCO0lBQ0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBWSxFQUFFLFFBQWE7UUFDakQsSUFBSSxRQUFRLENBQUMsT0FBTztlQUNoQixRQUFRLENBQUMsS0FBSztlQUNkLFFBQVEsQ0FBQyxRQUFRO2VBQ2pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQzdCLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNyRDtJQUNGLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQVksRUFBRSxRQUFhO1FBQ2hELElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxtQkFBbUI7ZUFDckMsUUFBUSxDQUFDLFFBQVE7ZUFDakIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDeEQ7SUFDRixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFZLEVBQUUsUUFBZ0I7UUFDaEQsMkJBQTJCO1FBQzNCLGdCQUFnQjtRQUNoQixJQUFJO1FBQ0osTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsSUFBSSxTQUFTLElBQUksUUFBUSxJQUFJLGFBQWEsRUFBRTtZQUMzQyxPQUFPLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM1RDtJQUNGLENBQUM7Q0FHRDtBQXBFRCw4Q0FvRUMifQ==