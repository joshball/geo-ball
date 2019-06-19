import React from 'react';
import { LatLngTxt } from '../common/geo/LatLngTxt';
import { downloadOsmFile } from '../../services/OsmService';
// import { downloadOsmFile, IDownloadOsmParams } from '../../services/OsmService';
import { DownloadLatLngBoundsBox } from './download/DownloadLatLngBoundsBox';
import { IDownloadOsmParams } from '../../../background/bg-ucsd';

// const outerBoxCss = css({
//     flex: '0 0 auto',
//     margin: '15px',
//     padding: '15px',
//     borderRadius: '6px',
//     backgroundColor: '#ebf1f5',
// });

// const headingCss = css({
//     marginBlockStart: '0',
//     marginBlockEnd: '0',
// });
// const rowCss = css({
//     marginTop: '10px',
//     marginLeft: '10px',
// });

export interface MapDataDisplayProps {
}

export class MapDataDisplay extends React.Component<MapDataDisplayProps> {
    constructor(props: MapDataDisplayProps) {
        super(props);
        this.downloadOsmFile = this.downloadOsmFile.bind(this);
    }
    downloadOsmFile(osmParams: IDownloadOsmParams) {
        console.log('MapDataDisplay.downloadOsm', osmParams);
        // const mapStore = this.props.stores!.mapLocation;
        // const { bounds, zoom, mousePos, clickPos, center, selectedAddress } = mapStore;
        downloadOsmFile(osmParams);
    }
    render() {
        // const latLngQuickFmt = 'htmlShort';
        // const mapStore = this.props.stores!.mapLocation;
        // const { bounds, zoom, mousePos, clickPos, center, selectedAddress } = mapStore;
        // console.log('XMapDataDisplay.render() mousePos', this.props.stores!.mapLocation.mousePos, mousePos);
        // console.log('XMapDataDisplay.render() clickPos', this.props.stores!.mapLocation.clickPos, clickPos);
        // console.log('XMapDataDisplay.render() bounds', this.props.stores!.mapLocation.bounds, bounds);
        // console.log('XMapDataDisplay.render() bounds', bounds);
        // console.log('XMapDataDisplay.render() center', center);
        // const addrStr = selectedAddress ? selectedAddress.label : '';

        return (
            <div>HEY</div>
            // <div {...outerBoxCss}>
            //     <h3 className={`${headingCss}`}>Current Map Data</h3>
            //     <div className={`${rowCss}`}>
            //         <b>Center</b>: <LatLngTxt llt={center} latLngQuickFmt={latLngQuickFmt} />
            //         <div>Copy as array or string</div>
            //     </div>
            //     <div className={`${rowCss}`}>
            //         <b>Addr</b>: {addrStr}
            //     </div>
            //     <div className={`${rowCss}`}>
            //         <b>Zoom</b>: {zoom}
            //     </div>
            //     <div className={`${rowCss}`}>
            //         <DownloadLatLngBoundsBox
            //             bounds={bounds}
            //             center={center}
            //             latLngQuickFmt={latLngQuickFmt}
            //             downloadOsmFile={this.downloadOsmFile}
            //         />
            //     </div>
            //     <h3 className={`${headingCss}`}>Current Mouse Location</h3>
            //     <div className={`${rowCss}`}>
            //         <b>Mouse</b>: <LatLngTxt llt={mousePos} latLngQuickFmt={latLngQuickFmt} />
            //         <div>Copy as array or string</div>
            //     </div>
            //     <div className={`${rowCss}`}>
            //         <b>Click</b>: <LatLngTxt llt={clickPos} latLngQuickFmt={latLngQuickFmt} />
            //         <div>Copy as array or string</div>
            //     </div>
            // </div>
        );
    }
}
