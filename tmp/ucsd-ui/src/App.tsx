import * as React from 'react';
// import './App.css';

// tslint:disable-next-line:import-name
// import logo from './logo.svg';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple as LeafLatLngTuple, LatLng as LeafLatLng } from 'leaflet';
// tslint:disable-next-line:no-implicit-dependencies


// async function loadRoadSegmentMetaData(): Promise<RoadSegmentMetaData> {
//     const resp = await fetch(url);
//     const roadSegementsFile = await resp.text();
//     const rsd = RoadSegmentsFile.loadJsonFile(roadSegementsFile);
//     const graph = new GeoGraph();
//     const rsmd = new RoadSegmentMetaData(rsd);
//     rsmd.buildMetaWithGeoGraph(graph);
//     return rsmd;
// }

// console.log('rsmd.intersections', rsmd.intersections);
// const UCSD = require('./data/maps/ucsd.json');

// const position: LeafLatLngTuple = [51.505, -0.09];
// const position: LeafLatLngTuple = [32.881, -117.238];
const position: LeafLatLngTuple = [32.8741164, -117.2382689];

// [
//     32.8770264,
//     -117.2382544,
//     32.8769957,
//     -117.2383353,
//     "Gilman Drive",
//     "tertiary"
// ],
// type RoadLine = {
//     start: Array<number>;
//     end: Array<number>;
//     name: string;
//     type: string;
// };

// type PositionData = {
//     position: Array<number>;
//     name: string;
//     type: string;
// };
// const extractLine = (line: Array<any>): RoadLine => {
//     return { start: [line[0], line[1]], end: [line[2], line[3]], name: line[4], type: line[5] };
// };
// const flatten = (array: Array<any>): Array<any> => array.reduce((all, curr) => all.concat(curr));
// const loadIntersections = (): Array<PositionData> => {
//     const lineSegments = UCSD.map(extractLine);
//     return flatten(lineSegments.map((ls: RoadLine) => {
//         return [
//             { position: ls.start, name: ls.name, type: ls.type },
//             { position: ls.end, name: ls.name, type: ls.type },
//         ];
//     }));
// };

// const intersections = loadIntersections();
interface State {
    intersections: Array<LatLng>;
    // rsls: Array<RoadSegmentLine>;
    // rsmd: RoadSegmentMetaData | undefined;
}

class App extends React.Component<any, State> {
    // private graph: GeoGraph;

    constructor(props: any) {
        super(props);
        // this.graph = new GeoGraph();
        this.state = {
            intersections: [],
            // rsls: [],
            // rsmd: undefined
        };
    }

    public componentDidMount() {
        // const url = 'http://localhost:3000/maps/sugarhouseone.map';
        const url = 'http://localhost:3000/maps/ucsd.map/intersections';
        console.log('fetching url:', url);
        fetch(url)
            .then(res => res.json())
            .then(intersections => {
                this.setState({ intersections });
            });
        // .then(res => res.text())
        // .then(data => {
        //     const rsls = data.split(/\r?\n/).filter(l => l !== '').map(l => {
        //         return RoadSegmentLine.CreateFromString(l);
        //     });
        //     const rsmd = new RoadSegmentMetaData(rsls);
        //     rsmd.buildMetaWithGeoGraph(this.graph);
        //     console.log('settting state', rsls, rsmd);
        //     this.setState({ rsls, rsmd });
        // });
    }
    public render() {
        // const accessToken = 'pk.eyJ1Ijoiam9zaHVhYmFsbCIsImEiOiJOa3lEeXVzIn0.3vrOo9qtFz-dJhgZfvJOYw';
        // const points = '';
        // let intersections: Array<LatLng> = [];
        // if (this.state.intersections) {
        //     intersections = this.state.rsmd.intersections;
        // }
        // if (this.state.rsmd) {
        //     intersections = this.state.rsmd.intersections;
        // }
        console.log('intersections', this.state.intersections);
        const points = this.state.intersections.map((latLng: LeafLatLng, index) => {
            const p = new LeafLatLng(latLng.lat, latLng.lng);
            console.log('g/p', index, p.toString());
            return (
                <Marker key={index} position={[p.lat, p.lng] as LeafLatLngTuple}>
                    <Popup>{p.toString()}</Popup>
                </Marker>
            );
        });
        // console.log('pointsX', pointsX);

        return (
            <Map id="mapId" center={position} zoom={17}>
                <TileLayer
                    url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={position}>
                    {points}
                </Marker>
            </Map>

            // <div className="App">
            //     <header className="App-header">
            //         <img src={logo} className="App-logo" alt="logo" />
            //         <h1 className="App-title">Welcome to React</h1>
            //     </header>
            //     <p className="App-intro">
            //         To get started, edit <code>src/App.tsx</code> and save to reload.
            //     </p>
            // </div>
        );
    }
}

export default App;
