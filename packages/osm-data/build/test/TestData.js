"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
;
;
;
;
exports.createNewBounds = () => {
    const objBounds = {
        sw: {
            lat: 32.859375,
            lon: -117.27233,
        },
        ne: {
            lat: 32.902622,
            lon: -117.20367,
        }
    };
    const sw = new __1.LatLng(objBounds.sw.lat, objBounds.sw.lon);
    const ne = new __1.LatLng(objBounds.ne.lat, objBounds.ne.lon);
    const latLngBounds = new __1.LatLngBounds(sw, ne);
    return {
        objBounds,
        sw,
        ne,
        latLngBounds
    };
};
exports.createNewOpenStreetmapQuery = (latLngBoundsTestData) => {
    latLngBoundsTestData = latLngBoundsTestData || exports.createNewBounds();
    const query = new __1.OpenStreetmapQuery(latLngBoundsTestData.latLngBounds);
    return {
        query,
        latLngBoundsTestData
    };
};
exports.dataDir = '.';
exports.osmJsonResp = {
    "version": 0.6,
    "generator": "Overpass API 0.7.55.4 3079d8ea",
    "osm3s": {
        "timestamp_osm_base": "2018-10-23T19:14:02Z",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    "elements": [
        {
            "type": "node",
            "id": 83550018,
            "lat": 40.7192445,
            "lon": -111.8535611,
            "tags": {
                "highway": "traffic_signals"
            }
        }
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC9UZXN0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUE4RDtBQU03RCxDQUFDO0FBSUQsQ0FBQztBQU9ELENBQUM7QUFLRCxDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQUcsR0FBMEIsRUFBRTtJQUMxRCxNQUFNLFNBQVMsR0FBRztRQUNqQixFQUFFLEVBQUU7WUFDSCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxDQUFDLFNBQVM7U0FDZjtRQUNELEVBQUUsRUFBRTtZQUNILEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLENBQUMsU0FBUztTQUNmO0tBQ0QsQ0FBQTtJQUNELE1BQU0sRUFBRSxHQUFHLElBQUksVUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxVQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxNQUFNLFlBQVksR0FBRyxJQUFJLGdCQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLE9BQU87UUFDTixTQUFTO1FBQ1QsRUFBRTtRQUNGLEVBQUU7UUFDRixZQUFZO0tBQ1osQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVZLFFBQUEsMkJBQTJCLEdBQUcsQ0FBQyxvQkFBNEMsRUFBRSxFQUFFO0lBQzNGLG9CQUFvQixHQUFHLG9CQUFvQixJQUFJLHVCQUFlLEVBQUUsQ0FBQztJQUNqRSxNQUFNLEtBQUssR0FBRyxJQUFJLHNCQUFrQixDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hFLE9BQU87UUFDTixLQUFLO1FBQ0wsb0JBQW9CO0tBQ3BCLENBQUM7QUFDSCxDQUFDLENBQUM7QUFHVyxRQUFBLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFHZCxRQUFBLFdBQVcsR0FBZ0M7SUFDdkQsU0FBUyxFQUFFLEdBQUc7SUFDZCxXQUFXLEVBQUUsZ0NBQWdDO0lBQzdDLE9BQU8sRUFBRTtRQUNSLG9CQUFvQixFQUFFLHNCQUFzQjtRQUM1QyxXQUFXLEVBQUUsMEdBQTBHO0tBQ3ZIO0lBQ0QsVUFBVSxFQUFFO1FBQ1g7WUFDQyxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFVBQVU7WUFDakIsS0FBSyxFQUFFLENBQUMsV0FBVztZQUNuQixNQUFNLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLGlCQUFpQjthQUM1QjtTQUNEO0tBQ0Q7Q0FDRCxDQUFDIn0=