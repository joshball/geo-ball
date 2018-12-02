import { writeFileSync, readFileSync } from 'fs'

import { LatLngBounds, LatLng } from '@ball-maps/geo-core';
import { OpenStreetmapFile } from '@ball-maps/osm-data';

import { RoadSegmentLine } from '../data/RoadSegmentLine';


export type IRoadSegmentsFileData = Array<RoadSegmentLine>;

export class RoadSegmentsFileMetaData {
	bounds: LatLngBounds;
	timestamp: Date;

	constructor(bounds:LatLngBounds, timestamp: Date) {
		this.bounds = bounds;
		this.timestamp = timestamp;
	}

	static CreateEmpty(): RoadSegmentsFileMetaData {
		const emptyBounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));
		return new RoadSegmentsFileMetaData(emptyBounds, new Date());
	}
}


export class RoadSegmentsFile {
	metaData: RoadSegmentsFileMetaData;
	segmentsData: IRoadSegmentsFileData;

	constructor(metaData: RoadSegmentsFileMetaData, segmentsData: IRoadSegmentsFileData) {
		this.metaData = metaData;
		this.segmentsData = segmentsData;
	}

	static CreateFromOsm(osmFile: OpenStreetmapFile): RoadSegmentsFile {
		const metaData = RoadSegmentsFile.CreateMetaDataFromOsm(osmFile)
		const segmentsData = RoadSegmentsFile.CreateSegmentsDataFromOsm(osmFile);
		return new RoadSegmentsFile(metaData, segmentsData);
	}


	static CreateSegmentsDataFromOsm(_osmFile: OpenStreetmapFile): IRoadSegmentsFileData {
		throw new Error("Method not implemented.");
	}
	static CreateMetaDataFromOsm(_osmFile: OpenStreetmapFile): RoadSegmentsFileMetaData {
		throw new Error("Method not implemented.");
	}


	static LoadFromTextFile(filePath: string): RoadSegmentsFile {
		const lines = readFileSync(filePath, 'utf8')
			.split(/\r?\n/)
			.filter(l => l !== '');

		const roadSegments = lines
			.map(l => {
				return RoadSegmentLine.CreateFromString(l);
			})
		const bounds = new LatLngBounds(new LatLng(1, 1), new LatLng(3, 3));
		const metaData = RoadSegmentsFileMetaData.CreateEmpty();
		// return new RoadSegmentsFile(bounds, new Date(), roadSegments);;
		return new RoadSegmentsFile(metaData, roadSegments);;
	}
	static LoadFromJsonFile(filePath: string): RoadSegmentsFile {
		const file = JSON.parse(readFileSync(filePath, 'utf8'));
		return new RoadSegmentsFile(file.metaData, file.segmentsData);
	}

	// ORIG: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
	/// NEW: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential


	static SaveJsonFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void {
		return writeFileSync(filePath, JSON.stringify(roadSegmentsFile));
	}

	static SaveTextFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void {
		const lines = roadSegmentsFile.segmentsData.map(rs => {
			const start = rs.start.lat + ' ' + rs.start.lon;
			const end = rs.end.lat + ' ' + rs.end.lon;
			return `${start} ${end} "${rs.name}" ${rs.type}`
		})
		return writeFileSync(filePath, lines.join('\r\n'));
	}

}
