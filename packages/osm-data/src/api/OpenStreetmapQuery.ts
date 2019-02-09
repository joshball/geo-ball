import { LatLngBounds, ILatLngBounds } from '@geo-ball/geo-core';
import { OSMFeatureKeyValuePair, OSMOutputFormat, OSMFeatureKey, IOSMFeatureKeyValuePair } from '../data/OpenStreetmapFeatures';

export interface IOpenStreetmapQuery{
    latLngBounds?: ILatLngBounds;
    outFormat?: OSMOutputFormat;
    timeoutInSec?: number;
    bds?: Array<string>;
    features?: Array<IOSMFeatureKeyValuePair>;
}


export class OpenStreetmapQuery {
    latLngBounds: LatLngBounds;
    outFormat: OSMOutputFormat;
    timeoutInSec: number;
    bds: Array<string>;
    features: Array<OSMFeatureKeyValuePair>;

    constructor(osmQueryObj: IOpenStreetmapQuery) {
        if (!osmQueryObj.latLngBounds) {
            throw new Error(`osmQueryObj does not have latLngBounds!`);
        }
        // console.log('osmQueryObj', osmQueryObj);
        // LatLngBounds, osmFeatures: Array<OSMFeatureKey> = ['highway', 'addr'], outFormat: OSMOutputFormat = 'json', timeoutInSec: number = 180;
        this.latLngBounds = LatLngBounds.FromBounds(osmQueryObj.latLngBounds);
        this.outFormat = osmQueryObj.outFormat || 'json';
        this.timeoutInSec = osmQueryObj.timeoutInSec || 180;
        this.bds = osmQueryObj.bds || ['node', 'way', 'rel'];
        if (osmQueryObj.features) {
            this.features = osmQueryObj.features.map((kvp: OSMFeatureKeyValuePair) => new OSMFeatureKeyValuePair(kvp.key, kvp.values));
        }
        else {
            const defaultFeatureKeys = ['highway', 'addr'] as Array<OSMFeatureKey>;
            this.features = defaultFeatureKeys.map(key => new OSMFeatureKeyValuePair(key));
        }
    }

    // constructor(latLngBounds: LatLngBounds, osmFeatures: Array<OSMFeatureKey> = ['highway', 'addr'], outFormat: OSMOutputFormat = 'json', timeoutInSec: number = 180) {
    //     if (!(latLngBounds instanceof LatLngBounds)){
    //         throw new Error(`latLngBounds is not instance of LaLatLngBoundsLng`);
    //     }
    // 	this.latLngBounds = new LatLngBounds(latLngBounds.sw, latLngBounds.ne);
    // 	this.outFormat = outFormat;
    // 	this.timeoutInSec = timeoutInSec;
    // 	this.features = osmFeatures.map(f => new OSMFeatureKeyValuePair(f));
    // 	this.bds = ['node', 'way', 'rel'];
    // }

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
    // rel["highway"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
    // // query part for: “"addr:street"=*”
    // node["addr"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
    // way["addr"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
    // rel["addr"](40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137);
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
