import { LatLngBounds } from '../utils/LatLngBounds';
import { OSMFeatureKeyValuePair, OSMOutputFormat,OSMFeatureKey } from './OpenStreetmapFeatures';

export class OpenStreetmapQuery {
	latLngBounds: LatLngBounds;
	outFormat: OSMOutputFormat;
	timeoutInSec: number;
	bds: Array<string>;
	features: Array<OSMFeatureKeyValuePair>;

	constructor(latLngBounds: LatLngBounds, osmFeatures: Array<OSMFeatureKey> = ['highway', 'addr'], outFormat: OSMOutputFormat = 'json', timeoutInSec: number = 180) {
		this.latLngBounds = latLngBounds;
		this.outFormat = outFormat;
		this.timeoutInSec = timeoutInSec;
		this.features = osmFeatures.map(f => new OSMFeatureKeyValuePair(f));
		this.bds = ['node', 'way', 'relation'];
	}

	// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL#Standalone_queries
	// It is almost always used in any Overpass QL query
	public toString(): string {
		const header = `[out:${this.outFormat}][timeout:${this.timeoutInSec}];`;
		const resultsString = this.getResultsString();
		const featuresString = this.getFeaturesString();
		return `${header}\n(\n${featuresString}\n);\n${resultsString}`;
	}


	// qt: Sort by quadtile index; this is roughly geographical and significantly faster than order by ids
	private getResultsString(): string {
		return (
			'out body;\n' +
			'>;\n' +
			// + '(._; >;);'
			'out skel qt;'
		);
	}
	// [out:json][timeout:25];
	// // gather results
	// (
	// // query part for: “highway=*”
	// node["highway"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
	// way["highway"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
	// relation["highway"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
	// // query part for: “"addr:street"=*”
	// node["addr"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
	// way["addr"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
	// relation["addr"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
	// );
	// // print results
	// out body;
	// >;
	// out skel qt;
	// (._;>;); out;

	private getFeaturesString(): string {
		const boundsString = `(${this.latLngBounds.toArray().join(',')})`;
		const featuresStrings: Array<string> = [];
		this.bds.forEach(bds => {
			this.features.forEach(kvp => {
				kvp.values.forEach(value => {
					const rest = value === '*' ? '' : `="${value}"`;
					featuresStrings.push(`    ${bds}["${kvp.key}${rest}"]${boundsString};`);
				});
			});
		});
		return featuresStrings.join('\n');
	}

}
