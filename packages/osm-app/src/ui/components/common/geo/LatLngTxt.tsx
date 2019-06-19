import React from 'react';
import { LatLngLiteral as LeafLatLngLiteral } from 'leaflet';
import { LatLng, LatLngQuickFmt, ILatLngFmt } from '@geo-ball/geo-core';

export interface LatLngTxtProps {
    llt?: LeafLatLngLiteral | null;
    latLngQuickFmt?: LatLngQuickFmt;
    latLngFmt?: ILatLngFmt;
}

export const LatLngTxt: React.SFC<LatLngTxtProps> = (props: LatLngTxtProps) => {
    // const [lat, lon] = props.llt;
    if (props.llt) {
        const latLngFmt = props.latLngQuickFmt
            ? { quickFmt: props.latLngQuickFmt }
            : props.latLngFmt || {};
        const latLngStr = new LatLng(props.llt.lat, props.llt.lng).format(latLngFmt);
        if (latLngStr.indexOf('<') >= 0) {
            return (
                <span
                    dangerouslySetInnerHTML={{ __html: latLngStr }}
                />
            );
        }
        return <span>{latLngStr}</span>;
    }
    return null;
};

export const getLatLngString = (latLng: LatLng, latLngFmt: ILatLngFmt) => {
    return latLng.format(latLngFmt);
};
