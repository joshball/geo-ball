import * as React from 'react'
import { css, StyleAttribute } from 'glamor'
import { LatLng, LatLngBounds } from 'leaflet';
import { LatLngTxtStyle, LatLngTxt } from './LatLngTxt';
// tslint:disable-next-line:no-duplicate-imports
import { MouseEventHandler } from 'react';
import { Popover, Button, Position, PopoverInteractionKind, Intent, Label, Classes, TextArea } from '@blueprintjs/core';
import { styles } from '../../OLD/views/theme/styles';
import { GeoFileName } from '../../lib/data-files/common/GeoFileName';
import { downloadOsmFile } from '../../services/OsmService';
import { OsmDownloadQueryForm } from './OsmDownloadQueryForm';

const outerBoxCss = css({
    // height: '100%',
    // width: '100%',
    // margin: '0 auto',
})

const popoverCss = css({
    zIndex: 500,
})
const popoverStyle = {
    zIndex: 500,
}
export type LatLngBoundsTxtStyle = 'array' | 'shortLng' | 'shortLon' | 'long';

export interface LatLngBoundsTxtProps {
    bounds?: LatLngBounds | null;
    llbStyle?: LatLngBoundsTxtStyle;
}

export interface DownloadLatLngBoundsBoxProps {
    bounds: LatLngBounds | null;
    llbStyle: LatLngBoundsTxtStyle;
    // downloadOsmx: (event: MouseEvent<HTMLButtonElement,MouseEvent>) => void;
    // downloadOsmx: (event: MouseEvent<HTMLButtonElement,MouseEvent>) => void;
    // downloadOsm: (event: React.EventHandler<React.MouseEvent<React.HTMLButtonElement>>) => void;
    downloadOsm: (event: any, bounds: LatLngBounds) => void;
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
const headingCss = css({
    marginBlockStart: '0',
    marginBlockEnd: '0',
})


export const DownloadLatLngBoundsBox: React.SFC<DownloadLatLngBoundsBoxProps> = (props: DownloadLatLngBoundsBoxProps) => {
    // const [lat, lon] = props.llt;
    if (props.bounds) {
        // const onClick = (e: any) => props.downloadOsm(e, props.bounds!)
        const onSubmit = (e: any) => {
            e.preventDefault();
            props.downloadOsm(e, props.bounds!);
        }
        return (
            <fieldset>
                <legend>&nbsp;<b>Map Bounds</b>&nbsp;</legend>
                <LatLngBoundsTxt {...props} />
                {/* <LatLngBoundsTxt bounds={props.bounds} llbStyle={props.llbStyle} /> */}
                <div>Copy as array or string</div>
                <Popover
                    usePortal={false}
                    // style={popoverStyle}
                    interactionKind={PopoverInteractionKind.CLICK}
                    popoverClassName="bp3-popover-content-sizing"
                    position={Position.LEFT}
                >
                    <Button intent={Intent.PRIMARY}>Download OSM</Button>
                    <div>
                        <h2>Download OpenStreetMap Data File</h2>
                        <div>
                            <OsmDownloadQueryForm downloadOsmFile={props.downloadOsm} bounds={props.bounds}/>
                        </div>
                    </div>
                </Popover>
                {/* <button type="button" className="bp3-button bp3-icon-add .modifier" onClick={onClick}>Download OSM</button> */}
            </fieldset>
        );
    }
    return null;
}

