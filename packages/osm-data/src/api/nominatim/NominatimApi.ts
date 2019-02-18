import { INominatimParams, NominatimParams } from "./INominatimParams";
import { INominatimResult } from "./INominatimResult";
import { URLSearchParams } from 'url';
// https://wiki.openstreetmap.org/wiki/Nominatim

export class NominatimApi {

    public static async search(params: NominatimParams): Promise<INominatimResult[]> {
        console.log('NominatimApi.search() params')
        console.log(params);
        const searchUrl = 'https://nominatim.openstreetmap.org/search';
        const url = searchUrl + '?' + params.getQueryParams();
        console.log('NominatimApi.search() queryParams')
        console.log(params.getQueryParams());
        console.log('NominatimApi.search() url', url)
        return fetch(url)
            .then(res => res.json())
            .then(json => json || []);
    }

}

// [
//     {
//         "place_id": "182514424",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "way",
//         "osm_id": "501552534",
//         "boundingbox": [
//             "40.7168063",
//             "40.7168874",
//             "-111.8505597",
//             "-111.8504293"
//         ],
//         "lat": "40.71684685",
//         "lon": "-111.8504945",
//         "display_name": "2516, Chadwick Street, Sugar House, Salt Lake City, Salt Lake County, Utah, 84106, USA",
//         "class": "building",
//         "type": "yes",
//         "importance": 0.821
//     }
// ]


// [
//     {
//         "place_id": "197709323",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "relation",
//         "osm_id": "198770",
//         "boundingbox": [
//             "40.699893",
//             "40.8530549",
//             "-112.101607",
//             "-111.739476"
//         ],
//         "lat": "40.7670126",
//         "lon": "-111.8904308",
//         "display_name": "Salt Lake City, Utah, USA",
//         "class": "place",
//         "type": "city",
//         "importance": 0.9939195817954151,
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/poi_place_city.p.20.png"
//     },
//     {
//         "place_id": "83831520",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "way",
//         "osm_id": "33194160",
//         "boundingbox": [
//             "40.7591385",
//             "40.76038",
//             "-111.8850219",
//             "-111.8837408"
//         ],
//         "lat": "40.7597628",
//         "lon": "-111.884717582062",
//         "display_name": "Salt Lake City Public Library, 210, 400 South, East Central, Greater Avenues, Salt Lake City, Salt Lake County, Utah, 84111, USA",
//         "class": "amenity",
//         "type": "library",
//         "importance": 0.658442011295126,
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/amenity_library.p.20.png"
//     },
//     {
//         "place_id": "157993068",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "way",
//         "osm_id": "358642885",
//         "boundingbox": [
//             "40.7387618",
//             "40.7394382",
//             "-111.92691",
//             "-111.9265351"
//         ],
//         "lat": "40.7390541",
//         "lon": "-111.926679848198",
//         "display_name": "Glendale Library, Concord Street, Glendale, Rose Park, Salt Lake City, Salt Lake County, Utah, 84104, USA",
//         "class": "amenity",
//         "type": "library",
//         "importance": 0.401,
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/amenity_library.p.20.png"
//     },
//     {
//         "place_id": "47994272",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "node",
//         "osm_id": "3635434264",
//         "boundingbox": [
//             "40.7390603",
//             "40.7391603",
//             "-111.9267493",
//             "-111.9266493"
//         ],
//         "lat": "40.7391103",
//         "lon": "-111.9266993",
//         "display_name": "Glendale Library, Concord Street, Glendale, Rose Park, Salt Lake City, Salt Lake County, Utah, 84104, USA",
//         "class": "amenity",
//         "type": "library",
//         "importance": 0.401,
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/amenity_library.p.20.png"
//     },
//     {
//         "place_id": "3354835",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "node",
//         "osm_id": "366385726",
//         "boundingbox": [
//             "40.724593",
//             "40.724693",
//             "-111.859276",
//             "-111.859176"
//         ],
//         "lat": "40.724643",
//         "lon": "-111.859226",
//         "display_name": "Sprague Library, 1100 East, Sugar House, Salt Lake City, Salt Lake County, Utah, 84105, USA",
//         "class": "amenity",
//         "type": "library",
//         "importance": 0.401,
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/amenity_library.p.20.png"
//     },
//     {
//         "place_id": "132866095",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "way",
//         "osm_id": "242757920",
//         "boundingbox": [
//             "40.7222063",
//             "40.7225082",
//             "-111.8600625",
//             "-111.8596076"
//         ],
//         "lat": "40.7223672",
//         "lon": "-111.859835541071",
//         "display_name": "Salt Lake City Fire Station Number 3, Simpson Avenue, Sugar House, Salt Lake City, Salt Lake County, Utah, 24106, USA",
//         "class": "amenity",
//         "type": "fire_station",
//         "importance": 0.401,
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/amenity_firestation3.p.20.png"
//     },
//     {
//         "place_id": "50384309",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "node",
//         "osm_id": "3897157293",
//         "boundingbox": [
//             "40.7672692",
//             "40.7673692",
//             "-111.8839257",
//             "-111.8838257"
//         ],
//         "lat": "40.7673192",
//         "lon": "-111.8838757",
//         "display_name": "Salt Lake City, 100 South, The Avenues, Greater Avenues, Salt Lake City, Salt Lake County, Utah, 84139, USA",
//         "class": "amenity",
//         "type": "vending_machine",
//         "importance": 0.401
//     },
//     {
//         "place_id": "5154238",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "node",
//         "osm_id": "585370637",
//         "boundingbox": [
//             "40.76095",
//             "40.76105",
//             "-111.89005",
//             "-111.88995"
//         ],
//         "lat": "40.761",
//         "lon": "-111.89",
//         "display_name": "Salt Lake City, 400 South, Central City / Liberty-Wells, Capitol Hill, Salt Lake City, Salt Lake County, Utah, 84139, USA",
//         "class": "man_made",
//         "type": "mine",
//         "importance": 0.401
//     },
//     {
//         "place_id": "195182563",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "way",
//         "osm_id": "595951389",
//         "boundingbox": [
//             "40.7619343",
//             "40.762173",
//             "-111.8851347",
//             "-111.8845443"
//         ],
//         "lat": "40.76205665",
//         "lon": "-111.884839344051",
//         "display_name": "Salt Lake City Justice Court, 333, 200 East, Central City / Liberty-Wells, Capitol Hill, Salt Lake City, Salt Lake County, Utah, 84111, USA",
//         "class": "amenity",
//         "type": "courthouse",
//         "importance": 0.401,
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/amenity_court.p.20.png"
//     },
//     {
//         "place_id": "68489183",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "node",
//         "osm_id": "5723738647",
//         "boundingbox": [
//             "40.804864",
//             "40.804964",
//             "-111.8630673",
//             "-111.8629673"
//         ],
//         "lat": "40.804914",
//         "lon": "-111.8630173",
//         "display_name": "10, City Creek Canyon Road, The Avenues, Greater Avenues, Salt Lake City, Salt Lake County, Utah, 84143, USA",
//         "class": "tourism",
//         "type": "picnic_site",
//         "importance": 0.401
//     }
// ]
