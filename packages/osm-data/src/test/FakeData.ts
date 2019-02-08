import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";
import { IOpenStreetmapFileMetaData } from "..";

// export const osmFileMetaData: IOpenStreetmapFileMetaData = {
//     "osmServer": "http://overpass-api.de/api/interpreter",
//     "osmQuery": {
//         "latLngBounds": {
//             "northEast": {
//                 "lat": 40.71765993790442,
//                 "lng": -111.84942215681079
//             },
//             "southWest": {
//                 "lat": 40.716033569597755,
//                 "lng": -111.8515679240227
//             }
//         },
//         "outFormat": "json",
//         "timeoutInSec": 180,
//         "bds": [
//             "node",
//             "way",
//             "relation"
//         ],
//         "features": [
//             {
//                 "key": "highway",
//                 "values": [
//                     "*"
//                 ]
//             },
//             {
//                 "key": "addr",
//                 "values": [
//                     "*"
//                 ]
//             }
//         ]
//     },
//     "queryName": "SET_A_NAME",
//     "queryDesc": "s",
//     "queryBoundsArea": {
//         "northEast": {
//             "lat": 40.71765993790442,
//             "lng": -111.84942215681079
//         },
//         "southWest": {
//             "lat": 40.716033569597755,
//             "lng": -111.8515679240227
//         }
//     },
//     "queryDate": "2019-02-08T00:36:41.126Z"
// };


export const osmQueryResp: IOpenStreetmapQueryResponse = {
    "version": 0.6,
    "generator": "Overpass API 0.7.55.5 2ca3f387",
    "osm3s": {
        "timestamp_osm_base": "2019-02-08T00:35:02Z",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    "elements": [
        {
            "type": "way",
            "id": 10132609,
            "nodes": [
                83589715,
                83589724,
                1611744260,
                83589725,
                83589728,
                83589730,
                83589732
            ],
            "tags": {
                "highway": "residential",
                "name": "Beverly Street",
                "tiger:cfcc": "A41",
                "tiger:county": "Salt Lake, UT",
                "tiger:name_base": "Beverly",
                "tiger:name_type": "St",
                "tiger:reviewed": "no"
            }
        },
        {
            "type": "way",
            "id": 10144453,
            "nodes": [
                83679752,
                83679719,
                1611744261,
                83679755,
                83679756,
                83627794
            ],
            "tags": {
                "highway": "residential",
                "name": "Chadwick Street",
                "tiger:cfcc": "A41",
                "tiger:county": "Salt Lake, UT",
                "tiger:name_base": "Chadwick",
                "tiger:name_type": "St",
                "tiger:reviewed": "no"
            }
        },
        {
            "type": "way",
            "id": 637270496,
            "nodes": [
                6008252219,
                6008252220
            ],
            "tags": {
                "footway": "sidewalk",
                "highway": "footway",
                "surface": "concrete"
            }
        },
        {
            "type": "way",
            "id": 637270497,
            "nodes": [
                6008252221,
                6008252222
            ],
            "tags": {
                "footway": "sidewalk",
                "highway": "footway",
                "surface": "concrete"
            }
        },
        {
            "type": "node",
            "id": 83589725,
            "lat": 40.7126901,
            "lon": -111.8513333
        },
        {
            "type": "node",
            "id": 83589728,
            "lat": 40.7111272,
            "lon": -111.8513927
        },
        {
            "type": "node",
            "id": 83589730,
            "lat": 40.7097823,
            "lon": -111.8513464
        },
        {
            "type": "node",
            "id": 83589732,
            "lat": 40.7086762,
            "lon": -111.8513223
        },
        {
            "type": "node",
            "id": 1611744260,
            "lat": 40.7127724,
            "lon": -111.8513344
        },
        {
            "type": "node",
            "id": 83627794,
            "lat": 40.7086701,
            "lon": -111.8501448
        },
        {
            "type": "node",
            "id": 83679755,
            "lat": 40.712693,
            "lon": -111.8501871
        },
        {
            "type": "node",
            "id": 83679756,
            "lat": 40.7111142,
            "lon": -111.8501983
        },
        {
            "type": "node",
            "id": 1611744261,
            "lat": 40.7127764,
            "lon": -111.8501938
        },
        {
            "type": "node",
            "id": 83589715,
            "lat": 40.7182327,
            "lon": -111.851392
        },
        {
            "type": "node",
            "id": 83589724,
            "lat": 40.7154637,
            "lon": -111.8513701
        },
        {
            "type": "node",
            "id": 6008252219,
            "lat": 40.7181634,
            "lon": -111.8503098
        },
        {
            "type": "node",
            "id": 6008252220,
            "lat": 40.715551,
            "lon": -111.8503017
        },
        {
            "type": "node",
            "id": 83679719,
            "lat": 40.7154806,
            "lon": -111.850203
        },
        {
            "type": "node",
            "id": 83679752,
            "lat": 40.7182388,
            "lon": -111.8502011
        },
        {
            "type": "node",
            "id": 6008252221,
            "lat": 40.7155625,
            "lon": -111.850114
        },
        {
            "type": "node",
            "id": 6008252222,
            "lat": 40.7181659,
            "lon": -111.850107
        }
    ]
};
