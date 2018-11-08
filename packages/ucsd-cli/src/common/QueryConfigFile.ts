import { LatLngBounds } from '@ball-maps/geo-core';
import { OpenStreetmapQuery, OpenStreetmapFile } from '@ball-maps/osm-data';
import { resolve, join } from 'path';
import { readFileSync } from 'fs';

// interface OsmDownloadArgs { osmQuery: any; osmEndpoint: any; dataDir: any; }

interface IResultsConfig {
	dataDir?: string;
	queryName: string;
	overwrite?: boolean;
	timestamp?: boolean;
}
interface IQueryConfig {
	bounds: LatLngBounds;
	osmEndpoint?: string;
	features: Array<string>;
}

interface IQueryConfigFile {
	query: IQueryConfig;
	results: IResultsConfig;
}

interface IOsmDownloadArgs {
	osmQuery: OpenStreetmapQuery;
	resultsFileName: string;
	overwrite: boolean;
	osmEndpoint?: string;
}


export class QueryConfigFile implements IQueryConfigFile {

	query: IQueryConfig;
	results: IResultsConfig;

	constructor(obj: IQueryConfigFile) {
		this.query = JSON.parse(JSON.stringify(obj.query));
		this.results = JSON.parse(JSON.stringify(obj.results));
	}

	// constructor(bounds: LatLngBounds, queryName: string, features?: Array<string>, osmEndpoint: string = '', dataDir: string = '', timestamp: boolean = false, overwrite?: boolean = false) {
	// 	this.query = {
	// 		bounds,
	// 		osmEndpoint,
	// 		features: features || [],
	// 	}
	// 	this.results = {
	// 		dataDir,
	// 		queryName,
	// 		overwrite,
	// 		timestamp
	// 	}
	// }

	static Load(queryCfgFilePath: string) {
		return QueryConfigFile.ReadAndParseQueryConfigFile(queryCfgFilePath);
	}

	static ReadAndParseQueryConfigFile(queryCfgFilePath: string) {
		queryCfgFilePath = resolve(queryCfgFilePath);
		const qfStr = readFileSync(queryCfgFilePath, 'UTF8');
		return JSON.parse(qfStr) as QueryConfigFile;
	}


	getOsmDownloadArgs(): IOsmDownloadArgs {
		const latLngBounds = LatLngBounds.FromBounds(this.query.bounds);
		const osmQuery = new OpenStreetmapQuery(latLngBounds);

		const now = this.results.timestamp ? new Date() : undefined;
		const fileName = OpenStreetmapFile.CreateFileName(this.results.queryName, now);
		const dataDir = resolve(this.results.dataDir || process.cwd());
		const resultsFileName: string = resolve(join(dataDir, fileName));
		const osmEndpoint = this.query.osmEndpoint;
		const overwrite = this.results.overwrite === true;

		return {
			osmQuery,
			resultsFileName,
			overwrite,
			osmEndpoint,
		}
	}
}

