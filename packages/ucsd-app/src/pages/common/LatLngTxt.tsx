import * as React from 'react'
import { css, StyleAttribute } from 'glamor'
import { LatLng, LatLngBounds, LatLngLiteral } from 'leaflet';

const outerBoxCss = css({
    // height: '100%',
    // width: '100%',
    // margin: '0 auto',
})



// Lat Lng Precision:
// decimal  degrees    distance
// places
// -------------------------------
// 0        1.0        111 km
// 1        0.1        11.1 km
// 2        0.01       1.11 km
// 3        0.001      111 m
// 4        0.0001     11.1 m
// 5        0.00001    1.11 m
// 6        0.000001   0.111 m
// 7        0.0000001  1.11 cm
// 8        0.00000001 1.11 mm
// six decimals is only a foot off. Plenty for us!

export type LatLngTxtStyle = 'array' | 'shortLng' | 'shortLon' | 'long';

export interface LatLngTxtProps {
    llt?: LatLngLiteral;
    lltStyle?: LatLngTxtStyle;
}
export const pl = (num: number): string => num.toFixed(6);

export const LatLonShortTxt = (latLng: LatLngLiteral, spanCss: StyleAttribute) => {
    const { lat, lng } = latLng;
    return (
        <span className={`${spanCss}`}>
            <span>Lat:</span>&nbsp;<code>{pl(lat)}</code>,&nbsp;<span>Lon:</span>&nbsp;<code>{pl(lng)}</code>
        </span>
    );
}
export const LatLngShortTxt = (latLng: LatLngLiteral, spanCss: StyleAttribute) => {
    const { lat, lng } = latLng;
    return (
        <span className={`${spanCss}`}>
            <span>Lat:</span>&nbsp;<code>{pl(lat)}</code>,&nbsp;<span>Lng:</span>&nbsp;<code>{pl(lng)}</code>
        </span>
    );
}
export const LatLngLongTxt = (latLng: LatLngLiteral, spanCss: StyleAttribute) => {
    const { lat, lng } = latLng;
    return (
        <span className={`${spanCss}`}>
            <span>Latitude:</span>&nbsp;<code>{pl(lat)}</code>,&nbsp;<span>Longitude:</span>&nbsp;<code>{pl(lng)}</code>
        </span>
    );
}

export const LatLngArrayTxt = (latLng: LatLngLiteral, spanCss: StyleAttribute) => {
    const { lat, lng } = latLng;
    return (
        <span className={`${spanCss}`}><code>{pl(lat)}</code>,&nbsp;<code>{pl(lng)}</code></span>
    );
}

export const LatLngTxt: React.SFC<LatLngTxtProps> = (props: LatLngTxtProps) => {
    // const [lat, lon] = props.llt;
    if (props.llt) {
        switch (props.lltStyle) {
            case 'shortLon': return LatLonShortTxt(props.llt, outerBoxCss);
            case 'long': return LatLngLongTxt(props.llt, outerBoxCss);
            case 'array': return LatLngArrayTxt(props.llt, outerBoxCss);
            case 'shortLng': return LatLngShortTxt(props.llt, outerBoxCss);
            default: return LatLngShortTxt(props.llt, outerBoxCss);
        }
    }
    return null;
}

