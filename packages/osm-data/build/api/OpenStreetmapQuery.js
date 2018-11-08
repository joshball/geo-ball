"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenStreetmapFeatures_1 = require("./OpenStreetmapFeatures");
class OpenStreetmapQuery {
    constructor(latLngBounds, osmFeatures = ['highway', 'addr'], outFormat = 'json', timeoutInSec = 180) {
        this.latLngBounds = latLngBounds;
        this.outFormat = outFormat;
        this.timeoutInSec = timeoutInSec;
        this.features = osmFeatures.map(f => new OpenStreetmapFeatures_1.OSMFeatureKeyValuePair(f));
        this.bds = ['node', 'way', 'relation'];
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblN0cmVldG1hcFF1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9PcGVuU3RyZWV0bWFwUXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtRUFBaUc7QUFFakcsTUFBYSxrQkFBa0I7SUFPOUIsWUFBWSxZQUEwQixFQUFFLGNBQW9DLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFlBQTZCLE1BQU0sRUFBRSxlQUF1QixHQUFHO1FBQy9KLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksOENBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLG9EQUFvRDtJQUM3QyxRQUFRO1FBQ2QsTUFBTSxNQUFNLEdBQUcsUUFBUSxJQUFJLENBQUMsU0FBUyxhQUFhLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQztRQUN4RSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNoRCxPQUFPLEdBQUcsTUFBTSxRQUFRLGNBQWMsU0FBUyxhQUFhLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBR0Qsc0dBQXNHO0lBQzlGLGdCQUFnQjtRQUN2QixPQUFPLENBQ04sYUFBYTtZQUNiLE1BQU07WUFDTixnQkFBZ0I7WUFDaEIsY0FBYyxDQUNkLENBQUM7SUFDSCxDQUFDO0lBQ0QsMEJBQTBCO0lBQzFCLG9CQUFvQjtJQUNwQixJQUFJO0lBQ0osaUNBQWlDO0lBQ2pDLGlHQUFpRztJQUNqRyxnR0FBZ0c7SUFDaEcscUdBQXFHO0lBQ3JHLHVDQUF1QztJQUN2Qyw4RkFBOEY7SUFDOUYsNkZBQTZGO0lBQzdGLGtHQUFrRztJQUNsRyxLQUFLO0lBQ0wsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixLQUFLO0lBQ0wsZUFBZTtJQUNmLGdCQUFnQjtJQUVSLGlCQUFpQjtRQUN4QixNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDbEUsTUFBTSxlQUFlLEdBQWtCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzFCLE1BQU0sSUFBSSxHQUFHLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQztvQkFDaEQsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUVEO0FBbEVELGdEQWtFQyJ9