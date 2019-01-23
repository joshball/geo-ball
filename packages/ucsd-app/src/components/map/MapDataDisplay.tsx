import * as React from 'react'
import { css } from 'glamor'
import { LatLngTxt } from '../common/LatLngTxt';
import { LatLngBoundsTxt, DownloadLatLngBoundsBox } from '../common/LatLngBoundsTxt';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../stores/RootStore';
import { LatLngBounds } from '../../../../geo-core/src/core/LatLngBounds';
import { downloadOsmFile } from '../../services/OsmService';

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
    stores?: RootStore;
}



@inject("stores")
@observer
export class MapDataDisplay extends React.Component<MapDataDisplayProps> {
    constructor(props: MapDataDisplayProps) {
        super(props)
    }
    downloadOsm(info: any) {
        console.log('MapDataDisplay.downloadOsm', info)
        downloadOsmFile(info);
    }
    render() {
        const llbStyle = 'shortLng';
        const lltStyle = 'shortLng';
        const mapStore = this.props.stores!.mapLocation;
        const { bounds, zoom, mousePos, clickPos, center, selectedAddress } = mapStore;
        // console.log('XMapDataDisplay.render() mousePos', this.props.stores!.mapLocation.mousePos, mousePos);
        // console.log('XMapDataDisplay.render() clickPos', this.props.stores!.mapLocation.clickPos, clickPos);
        // console.log('XMapDataDisplay.render() bounds', this.props.stores!.mapLocation.bounds, bounds);
        const addrStr = selectedAddress ? selectedAddress.label : '';
        // console.log('MapDataDisplay.bounds', bounds);
        // console.log('MapDataDisplay.center', center);
        // const boundsElem = bounds ?
        //     <div className={`${rowCss}`}>
        //         <fieldset>
        //             <legend>&nbsp;<b>Map Bounds</b>&nbsp;</legend>
        //             <LatLngBoundsTxt bounds={bounds} llbStyle={llbStyle} />
        //             <div>Copy as array or string</div>
        //             {/* <DownloadOsmDataComponent /> */}
        //             <button type="button" className="bp3-button bp3-icon-add .modifier" onClick={this.downloadOsm}>Download OSM</button>
        //         </fieldset>
        //     </div>
        //     : null;
        return (
            <div className={`${outerBoxCss}`}>
                <h3 className={`${headingCss}`}>Current Map Data</h3>
                <div className={`${rowCss}`}>
                    <b>Center</b>: <LatLngTxt llt={center} lltStyle={lltStyle} />
                    <div>Copy as array or string</div>
                </div>
                <div className={`${rowCss}`}><b>Addr</b>: {addrStr}</div>
                <div className={`${rowCss}`}><b>Zoom</b>: {zoom}</div>
                <div className={`${rowCss}`}><DownloadLatLngBoundsBox bounds={bounds} llbStyle={llbStyle} downloadOsm={this.downloadOsm}/></div>
                {/* {boundsElem} */}
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
