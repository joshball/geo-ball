import { resolve } from 'path';
import { readFileSync } from 'fs';
import { fileNamify } from '../utils/FileUtils';

type Maybe<T> = T | void;


export type OpenStreetMapFileType =
	'Unknown' |
	'UnknownJson' |
	'OsmDataJson' |
	'OsmDataGeoJson' |
	'OsmQueryJson' |
	'OsmQueryTxt';


// OSM File will have
// - OSM Server
// - OSM Query
// - ?curl command
// - Date
// - OSM Query Response
// - OSM Query Response Type (JSON|GeoJSON)

export class OpenStreetmapFile {
	path: string;
	type: OpenStreetMapFileType;
	data: any;

	constructor(path: string, type: OpenStreetMapFileType, data: any) {
		this.path = path;
		this.type = type;
		this.data = data;
	}

	static CreateFilenameTimestamp(date: Date = new Date()): string {
		return fileNamify(date.toISOString());
	}

	static Load(path: string): OpenStreetmapFile {
		const resolvedPath = resolve(path);
		const fileData = readFileSync(resolvedPath, 'utf8');
		return OpenStreetmapFile.GetFileType(resolvedPath, fileData);
	}

	static GetFileType(path: string, fileData: string): OpenStreetmapFile {
		return OpenStreetmapFile.TryJsonType(path, fileData)
			|| OpenStreetmapFile.TryTextType(path, fileData)
			|| new OpenStreetmapFile(path, 'Unknown', fileData);
	}

	static TryJsonType(path: string, fileData: string): Maybe<OpenStreetmapFile> {
		try {
			const osmData = JSON.parse(fileData);
			return OpenStreetmapFile.TryDataJsonType(path, osmData)
				|| OpenStreetmapFile.TryGeoJsonType(path, osmData)
				|| new OpenStreetmapFile(path, 'UnknownJson', fileData);
		} catch (error) {
			return undefined;
		}
	}

	static TryDataJsonType(path: string, jsonData: any): Maybe<OpenStreetmapFile> {
		if (jsonData.version
			&& jsonData.osm3s
			&& jsonData.elements
			&& jsonData.elements.length) {
			return new OpenStreetmapFile(path, 'OsmDataJson', jsonData);
		}
	}

	static TryGeoJsonType(path: string, jsonData: any): Maybe<OpenStreetmapFile> {
		if (jsonData.type === 'FeatureCollection'
			&& jsonData.features
			&& jsonData.features.length) {
			return new OpenStreetmapFile(path, 'OsmDataGeoJson', jsonData);
		}
	}

	static TryTextType(path: string, fileData: string): Maybe<OpenStreetmapFile> {
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
