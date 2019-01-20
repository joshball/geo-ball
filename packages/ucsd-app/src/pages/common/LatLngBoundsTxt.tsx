import * as React from 'react'
import { css, StyleAttribute } from 'glamor'
import { LatLng, LatLngBounds } from 'leaflet';
import { LatLngTxtStyle, LatLngTxt } from './LatLngTxt';

const outerBoxCss = css({
    // height: '100%',
    // width: '100%',
    // margin: '0 auto',
})

export type LatLngBoundsTxtStyle = 'array' | 'shortLng' | 'shortLon' | 'long';

export interface LatLngBoundsTxtProps {
    bounds?: LatLngBounds;
    llbStyle?: LatLngBoundsTxtStyle;
}


export const LatLngBoundShortTxt = (southWest: LatLng, northEast: LatLng, bbCss: StyleAttribute) => {
    return (
        <div className={`${bbCss}`}>
            <div>SW: <LatLngTxt llt={southWest} lltStyle={'shortLng'} /></div>
            <div>NE: <LatLngTxt llt={northEast} lltStyle={'shortLng'} /></div>
        </div>
    );
}
export const LatLngBoundLongTxt = (southWest: LatLng, northEast: LatLng, bbCss: StyleAttribute) => {
    return (
        <div className={`${bbCss}`}>
            <div>SouthWest: <LatLngTxt llt={southWest} lltStyle={'long'} /></div>
            <div>NorthEast: <LatLngTxt llt={northEast} lltStyle={'long'} /></div>
        </div>
    );
}
export const LatLngBoundArrayTxt = (southWest: LatLng, northEast: LatLng, bbCss: StyleAttribute) => {
    return (
        <span className={`${bbCss}`}>
            <LatLngTxt llt={southWest} lltStyle={'array'} />&nbsp;
            <LatLngTxt llt={northEast} lltStyle={'array'} />
        </span>
    );
}

export const LatLngBoundsTxt: React.SFC<LatLngBoundsTxtProps> = (props: LatLngBoundsTxtProps) => {
    // const [lat, lon] = props.llt;
    if (props.bounds) {
        const southWest = props.bounds.getSouthWest();
        const northEast = props.bounds.getNorthEast();
        switch (props.llbStyle) {
            case 'long': return LatLngBoundLongTxt(southWest, northEast, outerBoxCss);
            case 'array': return LatLngBoundArrayTxt(southWest, northEast, outerBoxCss);
            case 'shortLng': return LatLngBoundShortTxt(southWest, northEast, outerBoxCss);
            default: return LatLngBoundShortTxt(southWest, northEast, outerBoxCss);
        }
    }
    return null;
}

