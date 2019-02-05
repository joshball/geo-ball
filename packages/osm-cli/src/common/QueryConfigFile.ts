import { LatLngBounds } from '@geo-ball/geo-core';
import { OpenStreetmapQuery, OpenStreetmapFile, IOpenStreetmapQuery, OSMFeatureKeyValuePair, OSMFeatureKey } from '@geo-ball/osm-data';
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
        console.log(obj.query);
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
        console.log('qfstr', qfStr)
		const qf = JSON.parse(qfStr) as QueryConfigFile;
		return new QueryConfigFile(qf);
	}


	getOsmDownloadArgs(): IOsmDownloadArgs {
        // const latLngBounds = LatLngBounds.FromBounds(this.query.bounds);
        const osmQueryObj:IOpenStreetmapQuery = {
            latLngBounds: this.query.bounds,
            features: this.query.features.map(f => new OSMFeatureKeyValuePair(f as OSMFeatureKey))
        }
		const osmQuery = new OpenStreetmapQuery(osmQueryObj);

		const now = this.results.timestamp ? new Date() : undefined;
		const fileName = OpenStreetmapFile.CreateDescriptiveFileName(this.results.queryName, now);
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

