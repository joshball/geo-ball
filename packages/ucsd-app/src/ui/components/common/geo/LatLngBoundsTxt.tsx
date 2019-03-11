import * as React from 'react';
import { css } from 'glamor';

import { LatLngTxt } from './LatLngTxt';
import { ILatLngFmt, LatLngQuickFmt, LatLngBounds } from '@geo-ball/geo-core';

const outerBoxCss = css({
    // height: '100%',
    // width: '100%',
    // margin: '0 auto',
});

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
            <span className={`${outerBoxCss}`}>
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
