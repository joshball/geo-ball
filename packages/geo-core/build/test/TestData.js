"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC9UZXN0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUEwQztBQUt6QyxDQUFDO0FBSUQsQ0FBQztBQU9ELENBQUM7QUFFVyxRQUFBLGVBQWUsR0FBRyxHQUEwQixFQUFFO0lBQzFELE1BQU0sU0FBUyxHQUFHO1FBQ2pCLEVBQUUsRUFBRTtZQUNILEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLENBQUMsU0FBUztTQUNmO1FBQ0QsRUFBRSxFQUFFO1lBQ0gsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsQ0FBQyxTQUFTO1NBQ2Y7S0FDRCxDQUFBO0lBQ0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxVQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxNQUFNLEVBQUUsR0FBRyxJQUFJLFVBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELE1BQU0sWUFBWSxHQUFHLElBQUksZ0JBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUMsT0FBTztRQUNOLFNBQVM7UUFDVCxFQUFFO1FBQ0YsRUFBRTtRQUNGLFlBQVk7S0FDWixDQUFDO0FBQ0gsQ0FBQyxDQUFBIn0=