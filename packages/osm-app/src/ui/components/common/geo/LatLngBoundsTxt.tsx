import React from 'react';

import { LatLngTxt } from './LatLngTxt';
import { ILatLngFmt, LatLngQuickFmt, LatLngBounds } from '@geo-ball/geo-core';


export interface LatLngBoundsTxtProps {
    bounds?: LatLngBounds | null;
    latLngQuickFmt?: LatLngQuickFmt;
    latLngFmt?: ILatLngFmt;
}

export const LatLngBoundsTxt: React.SFC<LatLngBoundsTxtProps> = (props: LatLngBoundsTxtProps) => {
    // const [lat, lon] = props.llt;
    if (props.bounds) {
        const southWest = props.bounds.southWest;
        const northEast = props.bounds.northEast;
        return (
            <span>
                <div>
                    <b>SW:</b>{' '}
                    <LatLngTxt
                        llt={southWest}
                        latLngQuickFmt={props.latLngQuickFmt}
                        latLngFmt={props.latLngFmt}
                    />
                </div>
                <div>
                    <b>NE:</b>{' '}
                    <LatLngTxt
                        llt={northEast}
                        latLngQuickFmt={props.latLngQuickFmt}
                        latLngFmt={props.latLngFmt}
                    />
                </div>
            </span>
        );
    }
    return null;
};
