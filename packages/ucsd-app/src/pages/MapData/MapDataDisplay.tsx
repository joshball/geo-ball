import * as React from 'react'
import { css } from 'glamor'
import { LatLngTxt } from '../common/LatLngTxt';
import { LatLngBoundsTxt } from '../common/LatLngBoundsTxt';
import { observer, inject } from 'mobx-react';
import { MapState } from '../../stores/MapState';
import { DownloadOsmDataComponent } from './DownloadOsmDataComponent';

const outerBoxCss = css({
    flex: '0 0 auto',
    margin: '15px',
    padding: '15px',
    borderRadius: '6px',
    backgroundColor: '#ebf1f5',
})

const headingCss = css({
    marginBlockStart: '0',
    marginBlockEnd: '0',
})
const rowCss = css({
    marginTop: '10px',
    marginLeft: '10px'
})

export interface MapDataDisplayProps {
    // location!: MapLocation;
    // mousePos?: LatLng;
    mapState?: MapState;
}



// [40.7563038, -111.8781928]
@inject("mapState")
@observer
export class MapDataDisplay extends React.Component<MapDataDisplayProps> {

    render() {
        const llbStyle = 'shortLng';
        const lltStyle = 'shortLng';
        // const { bounds, center, mousePos, zoom, mapState } = props;
        const { mapState } = this.props;
        const { bounds, zoom, mousePos, clickPos, center, address } = mapState!;
        // console.log('MapDataDisplay.mapState', mapState);
        // const center = mapState!.center;
        // const center = mapState!.center;
        // console.log('mapState!.address', mapState!.address);
        // const addrStr = mapState!.address ? mapState!.address.label : '';
        const addrStr = address ? address.label : '';
        // console.log('MapDataDisplay.bounds', bounds);
        // console.log('MapDataDisplay.center', center);
        const boundsElem = bounds ?
            <div className={`${rowCss}`}>
                <fieldset>
                    <legend>&nbsp;<b>Map Bounds</b>&nbsp;</legend>
                    <LatLngBoundsTxt bounds={bounds} llbStyle={llbStyle} />
                    <div>Copy as array or string</div>
                    {/* <DownloadOsmDataComponent /> */}
                    <button type="button" className="bp3-button bp3-icon-add .modifier" >Download OSM</button>
                </fieldset>
            </div>
            : null;
        return (
            <div className={`${outerBoxCss}`}>
                <h3 className={`${headingCss}`}>Current Map Data</h3>
                <div className={`${rowCss}`}>
                    <b>Center</b>: <LatLngTxt llt={center} lltStyle={lltStyle} />
                    <div>Copy as array or string</div>
                </div>
                <div className={`${rowCss}`}><b>Addr</b>: {addrStr}</div>
                <div className={`${rowCss}`}><b>Zoom</b>: {zoom}</div>
                {boundsElem}
                <h3 className={`${headingCss}`}>Current Mouse Location</h3>
                <div className={`${rowCss}`}>
                    <b>Mouse</b>: <LatLngTxt llt={mousePos} lltStyle={lltStyle} />
                    <div>Copy as array or string</div>
                </div>
                <div className={`${rowCss}`}>
                    <b>Click</b>: <LatLngTxt llt={clickPos} lltStyle={lltStyle} />
                    <div>Copy as array or string</div>
                </div>
            </div>
        )
    }
}
