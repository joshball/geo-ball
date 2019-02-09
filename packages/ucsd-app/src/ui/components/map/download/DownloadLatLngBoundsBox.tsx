import * as React from 'react'

import { Popover, Button, Position, PopoverInteractionKind, Intent } from '@blueprintjs/core';
import { OsmDownloadQueryForm } from './OsmDownloadQueryForm';
import { ILatLngFmt, LatLngQuickFmt, LatLngBounds, LatLng, ILatLng } from '@geo-ball/geo-core';
import { LatLngBoundsTxt } from '../../common/geo/LatLngBoundsTxt';
import { LatLngBoundsAreaTxt } from '../../common/geo/LatLngBoundsAreaTxt';
import { IDownloadOsmParams } from '../../../services/OsmService';


export interface DownloadLatLngBoundsBoxProps {
    bounds: LatLngBounds | null;
    center: ILatLng | null;
    latLngQuickFmt?: LatLngQuickFmt;
    latLngFmt?: ILatLngFmt;
    downloadOsmFile: (osmParams: IDownloadOsmParams) => void;
}



export const DownloadLatLngBoundsBox: React.SFC<DownloadLatLngBoundsBoxProps> = (props: DownloadLatLngBoundsBoxProps) => {
    // const [lat, lon] = props.llt;
    if (props.bounds && props.center) {
        const downloadForm = <div style={{ maxWidth: '600px', width: '500px', maxHeight: '600px' , height: '600px', padding:'20px 35px 20px 35px' }}>
            <h2>Download OpenStreetMap Data File</h2>
            <div>
                <OsmDownloadQueryForm downloadOsmFile={props.downloadOsmFile} bounds={props.bounds} center={props.center} area='AREA TODO' />
            </div>
        </div>;
        return (
            <fieldset>
                <legend>&nbsp;<b>Map Bounds</b>&nbsp;</legend>
                <LatLngBoundsTxt {...props} />
                <LatLngBoundsAreaTxt {...props}></LatLngBoundsAreaTxt>
                <div>Copy as array or string</div>

                <Popover
                    usePortal={false}
                    content={downloadForm}
                    interactionKind={PopoverInteractionKind.CLICK}
                    // popoverClassName="bp3-popover-content-sizing"
                    position={Position.LEFT}
                >
                    <Button intent={Intent.PRIMARY}>Download OSM</Button>

                </Popover>
            </fieldset>
        );
    }
    return null;
}

