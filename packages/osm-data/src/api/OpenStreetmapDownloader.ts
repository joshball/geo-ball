import axios from 'axios';
import { resolve } from 'path';
import { writeFileSync, existsSync } from 'fs';
import { OpenStreetmapQuery } from './OpenStreetmapQuery';
import { OpenStreetmapFile, OpenStreetmapFileMetaData } from '../files/OpenStreetmapFile';
import { IOpenStreetmapQueryResponse } from './IOpenStreetmapQueryResponse';

// https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
const OverPassApiEndpoints = {
	main: 'http://overpass-api.de/api/interpreter',
	lz4: 'https://lz4.overpass-api.de/api/interpreter',
	z: 'https://z.overpass-api.de/api/interpreter',
	fr: 'http://overpass.openstreetmap.fr/api/interpreter',
	kumi: 'https://overpass.kumi.systems/api/interpreter',
};
const DEFAULT_ENDPOINT = OverPassApiEndpoints.main;

export interface IFetchAndSaveResult {
	osmDataFile: OpenStreetmapFile;
	osmDataFilePath: string;
}

export class OpenStreetmapDownloader {
	endpoint: string;

	constructor(endpoint?: string) {
		this.endpoint = endpoint || DEFAULT_ENDPOINT;
	}

	public fetch(query: OpenStreetmapQuery): Promise<IOpenStreetmapQueryResponse> {
		if (!query.latLngBounds || !query.latLngBounds.valid()) {
			throw new Error('OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
		}
		const url = this.endpoint;
		const osmFormattedQuery = query.toString();

		// const url = 'http://localhost:1234';
		console.log('overpass query:', osmFormattedQuery)
		console.log('\noverpass url:', url);
		return axios.post(url, osmFormattedQuery).then(response => {
			// console.log('axios.post:', response.status);
			// console.log('axios.post response.data:', response.data);
			// console.log('axios.post response:', response);
			return response.data;
		});
	}

	public fetchAndSave(osmQuery: OpenStreetmapQuery, osmDataFilePath: string, overwriteFile: boolean = false): Promise<IFetchAndSaveResult> {
		osmDataFilePath = resolve(osmDataFilePath);
		if (!overwriteFile && existsSync(osmDataFilePath)) {
			throw new Error(`File exists [${osmDataFilePath}]`);
		}
		const osmMetaData = new OpenStreetmapFileMetaData(this.endpoint, osmQuery);
		return this.fetch(osmQuery).then((osmQueryResp: IOpenStreetmapQueryResponse) => {
			const osmDataFile = new OpenStreetmapFile(osmMetaData, osmQueryResp);
			writeFileSync(osmDataFilePath, JSON.stringify(osmDataFile, undefined, 4));
			return {
				osmDataFile,
				osmDataFilePath,
			};
		});
	}
}
