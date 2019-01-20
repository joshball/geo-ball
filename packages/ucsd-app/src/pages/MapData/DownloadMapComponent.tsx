import * as React from 'react'
import { Map, Marker, Popup, TileLayer, MapControl } from 'react-leaflet';
import { css } from 'glamor'
import { LatLng, LeafletMouseEvent, ResizeEvent, LeafletEvent } from 'leaflet';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';
// import LocationSelector from './LocationSelector';
// import { MapLocation } from '../../services/MapLocation';
// import store from '../../services/MapDataStore'
import { MapState } from '../../stores/MapState';
import { getRoadSegmentsFiles } from '../../services/MapService';

const mapCss = css({
    height: '100%',
    width: '100%',
    minHeight: '800px',
    minWidth: '800px',
    margin: '0 auto',
})

export interface MapProps {
    mapState?: MapState;
}

@inject("mapState")
@observer
export class DownloadMapComponent extends React.Component<MapProps> {

    mapRef = React.createRef<Map>()

    constructor(props: MapProps) {
        super(props);
        // console.log('CTR.this.refs:', this.refs);
    }

    componentDidMount() {
        const map = this.mapRef.current as Map;
        // console.log('CDM.this.refs:', this.refs);
        // console.log('map.leafletElement.getBounds():', map.leafletElement.getBounds());
        this.updateMapState(map);
        // this.mapApi = this.refs.map.leafletElement; // <= this is the Leaflet Map object
        // let bounds = this.mapApi.getBounds();
    }


    @action
    handleMouseMove = (e: LeafletMouseEvent) => {
        // console.log('DMC.handleMouseMove', e.latlng)
        const map = this.mapRef.current as Map;
        const mapState = this.props.mapState!;
        mapState.updateMousePosition(e.latlng);
        // mapState.setBounds(bounds);
    }

    @action
    updateMapState = (map: Map) => {
        const bounds = map.leafletElement.getBounds();
        const center = map.leafletElement.getCenter();
        const zoom = map.leafletElement.getZoom();
        // const size = map.leafletElement.getSize();
        // const pane = map.leafletElement.getPane();
        // const panes = map.leafletElement.getPanes();
        // const zoomScale = map.leafletElement.getZoomScale(2,3)
        // const scaleZoom = map.leafletElement.getScaleZoom(2,5);
        // console.log('DMC.map', map)
        // console.log('DMC.bounds', bounds)
        // console.log('DMC.center', center)
        // console.log('DMC.zoom', zoom)
        // console.log('DMC.size', size)
        // console.log('DMC.panes', panes)
        // console.log('DMC.zoomScale(2,3)', zoomScale)
        // console.log('DMC.scaleZoom(2,5)', scaleZoom)
        const mapState = this.props.mapState!;
        mapState.update(center, bounds, zoom);
        // mapState.setBounds(bounds);
        // mapState.setCenter(center);
        // mapState.setZoom(zoom);
    }

    @action
    handleMoveEnd = (e: LeafletEvent) => {
        // console.log('DMC.handleMoveEnd', e);
        const map = this.mapRef.current as Map;
        this.updateMapState(map);
    }


    @action
    handleLeftClick = (e: LeafletMouseEvent) => {
        // console.log('DMC.handleLeftClick', e.latlng)
        // console.log('DMC.e.originalEvent.type', e.type)
        const mapState = this.props.mapState!;
        // console.log('DMC.mapState BEF', mapState)
        mapState.updateClickLocation(e.latlng);
    }

    // @action
    // handleRightClick = (e: LeafletMouseEvent) => {
    //     // console.log('DMC.handleLeftClick', e.latlng)
    //     // console.log('DMC.e.originalEvent.type', e.type)
    //     const mapState = this.props.mapState!;
    //     // console.log('DMC.mapState BEF', mapState)
    //     mapState.updateClickLocation(e.latlng);
    // }
    render() {
        const mapState = this.props.mapState!;
        // console.log('REND.this.refs:', this.refs);

        // console.log('DMC.render mapState.center:', mapState.center);
        // mapState.changeIt();
        // console.log('DownloadMapComponent mapState.center:', mapState.center);
        // // console.log('DownloadMapComponent location:', location);
        // var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        // });
        // var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        // });
        // ar Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //     subdomains: 'abcd',
        //     minZoom: 1,
        //     maxZoom: 16,
        //     ext: 'jpg'
        // });
        // var Stamen_TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
        //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //     subdomains: 'abcd',
        //     minZoom: 0,
        //     maxZoom: 18,
        //     ext: 'png'
        // });

        // var Stamen_TopOSMRelief = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toposm-color-relief/{z}/{x}/{y}.{ext}', {
        //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //     subdomains: 'abcd',
        //     minZoom: 0,
        //     maxZoom: 20,
        //     ext: 'jpg',
        //     bounds: [[22, -132], [51, -56]]
        // });

        // var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        //     subdomains: 'abcd',
        //     maxZoom: 19
        // });
        return (
            <Map
                className={`${mapCss}`}
                center={mapState.center}
                zoom={mapState.zoom}
                onmousemove={this.handleMouseMove}
                onclick={this.handleLeftClick}
                onload={this.handleMoveEnd}
                onviewreset={this.handleMoveEnd}
                onmoveend={this.handleMoveEnd}
                // oncontextmenu={this.handleRightClick}
                ref={this.mapRef}>
                {/* <MapControl>
                    <LocationSelector locations={mapLocations} selectedName={selected} onSubmit={onSubmit} />
                </MapControl> */}

                <TileLayer
                    url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                    // url={`https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png`}
                    // url={`https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png`}
                    // url={`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`}
                    // url={`https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}`}
                    // url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`}
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            </Map>)

    }
}


