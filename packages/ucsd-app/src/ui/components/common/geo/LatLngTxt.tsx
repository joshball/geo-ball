import * as React from 'react'
import { css, StyleAttribute } from 'glamor'
import { LatLngLiteral as LeafLatLngLiteral} from 'leaflet';
import { LatLng, LatLngQuickFmt, ILatLngFmt } from '@ball-maps/geo-core';

const outerBoxCss = css({
    // height: '100%',
    // width: '100%',
    // margin: '0 auto',
})


export interface LatLngTxtProps {
    llt?: LeafLatLngLiteral | null;
    latLngQuickFmt?: LatLngQuickFmt;
    latLngFmt?: ILatLngFmt;
}

export const LatLngTxt: React.SFC<LatLngTxtProps> = (props: LatLngTxtProps) => {
    // const [lat, lon] = props.llt;
    if (props.llt) {
        const latLngFmt = props.latLngQuickFmt ? { quickFmt: props.latLngQuickFmt } : props.latLngFmt || {};
        const latLngStr = new LatLng(props.llt.lat, props.llt.lng).format(latLngFmt);
        if (latLngStr.indexOf('<') >= 0) {
            return (
                <span className={`${outerBoxCss}`} dangerouslySetInnerHTML={{__html: latLngStr}}></span>
            );
        }
        return (
            <span className={`${outerBoxCss}`}>{latLngStr}</span>
        );
    }
    return null;
}

export const getLatLngString = (latLng: LatLng, latLngFmt: ILatLngFmt) => {
    return latLng.format(latLngFmt);
}

