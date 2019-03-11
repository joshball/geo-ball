import * as React from 'react';
import { css } from 'glamor';
import { distance } from '@turf/turf';

import { LatLngBoundsTxtProps } from './LatLngBoundsTxt';

const outerBoxCss = css({
    // height: '100%',
    // width: '100%',
    // margin: '0 auto',
});

// export const AreaTxt = (southWest: LatLng, northEast: LatLng, bbCss: StyleAttribute) => {
export const LatLngBoundsAreaTxt = (props: LatLngBoundsTxtProps) => {
    if (props.bounds) {
        const clean = (num: number) => Number.parseFloat(num.toString()).toFixed(2);
        const southWest = props.bounds.southWest;
        const northEast = props.bounds.northEast;
        const northWest = { lat: northEast.lat, lng: southWest.lng };
        // const northWest = new LatLng(northEast.lat,southWest.lng);
        // const latDistLeaf = southWest.distanceTo(northWest);
        const latDistMeters = distance(
            [northWest.lng, northWest.lat],
            [southWest.lng, southWest.lat],
            { units: 'meters' },
        );
        const lngDistMeters = distance(
            [northWest.lng, northWest.lat],
            [northEast.lng, northEast.lat],
            { units: 'meters' },
        );
        const area = latDistMeters * lngDistMeters;
        return (
            <span className={`${outerBoxCss}`}>
                <div>
                    <b>Area:</b> {clean(area)} m^2
                </div>
                <div>
                    <b>LatDist:</b> {clean(latDistMeters)} meters
                </div>
                <div>
                    <b>LngDist:</b> {clean(lngDistMeters)} meters
                </div>
            </span>
        );
    }
    return null;
};
// export const LatLngBoundsAreaTxt = (props: LatLngBoundsTxtProps) => {
//     if (props.bounds) {
//         const clean = (num: number) => Number.parseFloat(num.toString()).toFixed(2);
//         const southWest = props.bounds.getSouthWest();
//         const northEast = props.bounds.getNorthEast();
//         const northWest = { lat: northEast.lat, lng: southWest.lng }
//         // const northWest = new LatLng(northEast.lat,southWest.lng);
//         // const latDistLeaf = southWest.distanceTo(northWest);
//         const latDistMeters = distance([northWest.lng, northWest.lat], [southWest.lng, southWest.lat], { units: 'meters' });
//         const lngDistMeters = distance([northWest.lng, northWest.lat], [northEast.lng, northEast.lat], { units: 'meters' });
//         const area = latDistMeters * lngDistMeters;
//         return (
//             <span className={`${outerBoxCss}`}>
//                 <div><b>Area:</b> {clean(area)} m^2</div>
//                 <div><b>LatDist:</b> {clean(latDistMeters)} meters</div>
//                 <div><b>LngDist:</b> {clean(lngDistMeters)} meters</div>
//             </span>
//         );
//     }
//     return null;
// }
