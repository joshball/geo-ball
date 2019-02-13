"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geo_core_1 = require("@geo-ball/geo-core");
const OpenStreetmapFeatures_1 = require("../data/OpenStreetmapFeatures");
class OpenStreetmapQuery {
    constructor(osmQueryObj) {
        if (!osmQueryObj.latLngBounds) {
            throw new Error(`osmQueryObj does not have latLngBounds!`);
        }
        // console.log('osmQueryObj', osmQueryObj);
        // LatLngBounds, osmFeatures: Array<OSMFeatureKey> = ['highway', 'addr'], outFormat: OSMOutputFormat = 'json', timeoutInSec: number = 180;
        this.latLngBounds = geo_core_1.LatLngBounds.FromBounds(osmQueryObj.latLngBounds);
        this.outFormat = osmQueryObj.outFormat || 'json';
        this.timeoutInSec = osmQueryObj.timeoutInSec || 180;
        this.bds = osmQueryObj.bds || ['node', 'way', 'rel'];
        if (osmQueryObj.features) {
            this.features = osmQueryObj.features.map((kvp) => new OpenStreetmapFeatures_1.OSMFeatureKeyValuePair(kvp.key, kvp.values));
        }
        else {
            const defaultFeatureKeys = ['highway', 'addr'];
            this.features = defaultFeatureKeys.map(key => new OpenStreetmapFeatures_1.OSMFeatureKeyValuePair(key));
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
    toString() {
        const header = `[out:${this.outFormat}][timeout:${this.timeoutInSec}];`;
        const resultsString = this.getResultsString();
        const featuresString = this.getFeaturesString();
        return `${header}\n(\n${featuresString}\n);\n${resultsString}`;
    }
    // qt: Sort by quadtile index; this is roughly geographical and significantly faster than order by ids
    getResultsString() {
        return ('out body;\n' +
            '>;\n' +
            // + '(._; >;);'
            'out skel qt;');
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
    getFeaturesString() {
        const boundsString = `(${this.latLngBounds.toArray().join(',')})`;
        const featuresStrings = [];
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
exports.OpenStreetmapQuery = OpenStreetmapQuery;
//# sourceMappingURL=OpenStreetmapQuery.js.map