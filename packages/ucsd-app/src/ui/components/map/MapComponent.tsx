import * as React from 'react'
import { Map, Marker, Popup, TileLayer, MapControl } from 'react-leaflet';
import { css } from 'glamor'
import { LeafletMouseEvent, LeafletEvent } from 'leaflet';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../stores/RootStore';
import { MapLocationStore } from '../../stores/MapLocationStore';
import { distance } from '@turf/turf';
import { getDist } from '@geo-ball/geo-core';

const mapCss = css({
    height: '100%',
    width: '100%',
    minHeight: '800px',
    minWidth: '800px',
    margin: '0 auto',
})

export interface MapProps {
    stores?: RootStore;
}

@inject("stores")
@observer
export class MapComponent extends React.Component<MapProps> {

    // mapRef: React.RefObject<Map>;
    mapRef = React.createRef<Map>();
    mapLocationStore: MapLocationStore;

    constructor(props: MapProps) {
        super(props);
        this.mapLocationStore = this.props.stores!.mapLocation;
        // this.mapRef = React.createRef<Map>();
    }

    componentDidMount() {
        // const map = this.mapRef.current as Map;
        // console.log('CDM.this.refs:', this.refs);
        // console.log('map.leafletElement.getBounds():', map.leafletElement.getBounds());
        console.log('componentDidMount', this.mapRef, this.mapRef.current)
        if (this.mapRef && this.mapRef.current) {
            this.updateMapState(this.mapRef.current!);
        }
        // this.mapApi = this.refs.map.leafletElement; // <= this is the Leaflet Map object
        // let bounds = this.mapApi.getBounds();
    }


    @action
    handleMouseMove = (e: LeafletMouseEvent) => {
        // console.log('DMC.handleMouseMove', e.latlng)
        // const map = this.mapRef.current as Map;
        // const mapStore = this.props.stores!.map;
        this.mapLocationStore.updateMousePosition(e.latlng);
        // mapState.setBounds(bounds);
    }

    @action
    updateMapState = (map: Map) => {
        console.log('DMC.updateMapState', map)
        const center = map.leafletElement.getCenter();
        const zoom = map.leafletElement.getZoom();
        const bounds = map.leafletElement.getBounds();
        // const mapStore = this.props.stores!.map;
        this.mapLocationStore.updateCore(center, zoom, bounds);
        // mapState.setBounds(bounds);
        // mapState.setCenter(center);
        // mapState.setZoom(zoom);

    }


    // createMarkers() {
    //     if (this.mapLocationStore.bounds) {
    //         const d = this.getBoundsData(this.mapLocationStore.bounds);
    //         const markers = [
    //             { name: 'SW', pos: d.southWest, txt: `North is ${d.latDist} [${d.latDelta}]` },
    //             { name: 'NE', pos: d.northEast, txt: `just NE` },
    //             { name: 'NW', pos: d.northWest, txt: `West is ${d.lngDist} [${d.lngDelta}]` },
    //         ]
    //         return markers.map((m, i) => (
    //             <Marker key={i} position={m.pos}>
    //                 <Popup>[${m.name}]:${m.txt}</Popup>
    //             </Marker>
    //         ));
    //     }
    //     return null;
    // }
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
        // const mapStore = this.props.stores!.map;
        // console.log('DMC.mapState BEF', mapState)
        this.mapLocationStore.updateClickLocation(e.latlng);
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
        // console.log('XMapComponent.render() this.mapDisplay', this.mapLocationStore);
        // console.log('XMapComponent.render() this.mapRef', this.mapRef);
        // const mapStore = this.props.stores!.map;
        // const markers = this.createMarkers();
        // console.log('oldMarkers BEF', oldMarkers)
        // oldMarkers = oldMarkers == null ? markers : oldMarkers;
        // console.log('oldMarkers aFT', oldMarkers)
        return (
            <Map
                className={`${mapCss}`}
                center={this.mapLocationStore.center}
                zoom={this.mapLocationStore.zoom}
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
                {/* <Marker position={this.mapLocationStore.center}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker>
                {oldMarkers}
                {markers} */}
            </Map>)

    }
}
// let oldMarkers: any = null;

// var
//   _firstLatLng,
//   _firstPoint,
//   _secondLatLng,
//   _secondPoint,
//   _distance,
//   _length,
//   _polyline
// _map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(_map);

// // add listeners to click, for recording two points
// _map.on('click', function(e) {

//   if (!_firstLatLng) {
//     _firstLatLng = e.latlng;
//     _firstPoint = e.layerPoint;
//     L.marker(_firstLatLng).addTo(_map).bindPopup('Point A<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
//   } else {
//     _secondLatLng = e.latlng;
//     _secondPoint = e.layerPoint;
//     L.marker(_secondLatLng).addTo(_map).bindPopup('Point B<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
//   }

//   if (_firstLatLng && _secondLatLng) {
//     // draw the line between points
//     L.polyline([_firstLatLng, _secondLatLng], {
//       color: 'red'
//     }).addTo(_map);

//     refreshDistanceAndLength();
//   }
// })

// _map.on('zoomend', function(e) {
//   refreshDistanceAndLength();
// })

// function refreshDistanceAndLength() {
//   _distance = L.GeometryUtil.distance(_map, _firstLatLng, _secondLatLng);
//   _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
//   document.getElementById('distance').innerHTML = _distance;
//   document.getElementById('length').innerHTML = _length;
// }

