import * as React from 'react'
import { css } from 'glamor'
import { LatLng as LeafLatLng } from 'leaflet';
import { LatLngTxt } from '../common/geo/LatLngTxt';
import { observer, inject } from 'mobx-react';
import {  colors, fontSizes, fonts } from "../../config/theme"
import { IGeocodeResponse, geocodeAddress } from '../../services/GeocodingService';
import { RootStore } from '../../stores/RootStore';


export interface AddressSearchComponentProps {
    stores?: RootStore;
}


const singleResultCss = css({
    border: '1px solid grey',
    marginTop: '10px',
    padding: '6px'
})

const labelCss = css({
    color: colors.text,
    fontSize: fontSizes.medium,
    fontFamily: fonts.Roboto,
    padding: 0,
    margin: 0,
})

const llCss = css({
    marginLeft: '16px'
})

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

const searchSaltLakeResults = [{ "x": "-111.855195166234", "y": "40.7140751845104", "label": "Salt Lake City, Utah, 84106, USA", "bounds": [[40.71402518451, -111.85524516623], [40.71412518451, -111.85514516623]], "raw": { "place_id": "200403338", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "boundingbox": ["40.71402518451", "40.71412518451", "-111.85524516623", "-111.85514516623"], "lat": "40.7140751845104", "lon": "-111.855195166234", "display_name": "Salt Lake City, Utah, 84106, USA", "class": "place", "type": "postcode", "importance": 0.335 } }, { "x": "17.0425431637315", "y": "48.2288437553095", "label": "Záhorská Bystrica, Region of Bratislava, 84106, Slovakia", "bounds": [[48.228793755309, 17.042493163731], [48.228893755309, 17.042593163732]], "raw": { "place_id": "200341243", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "boundingbox": ["48.228793755309", "48.228893755309", "17.042493163731", "17.042593163732"], "lat": "48.2288437553095", "lon": "17.0425431637315", "display_name": "Záhorská Bystrica, Region of Bratislava, 84106, Slovakia", "class": "place", "type": "postcode", "importance": 0.335 } }, { "x": "23.6226898682964", "y": "56.2455964941915", "label": "Joniškis, Joniškio rajono savivaldybė, Siauliai County, 84106, Lithuania", "bounds": [[56.245546494192, 23.622639868296], [56.245646494192, 23.622739868296]], "raw": { "place_id": "199767869", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "boundingbox": ["56.245546494192", "56.245646494192", "23.622639868296", "23.622739868296"], "lat": "56.2455964941915", "lon": "23.6226898682964", "display_name": "Joniškis, Joniškio rajono savivaldybė, Siauliai County, 84106, Lithuania", "class": "place", "type": "postcode", "importance": 0.335 } }, { "x": "11.8637839900143", "y": "48.6260265606509", "label": "Volkenschwand, Lower Bavaria, Bavaria, 84106, Germany", "bounds": [[48.625976560651, 11.863733990014], [48.626076560651, 11.863833990014]], "raw": { "place_id": "199524045", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "boundingbox": ["48.625976560651", "48.626076560651", "11.863733990014", "11.863833990014"], "lat": "48.6260265606509", "lon": "11.8637839900143", "display_name": "Volkenschwand, Lower Bavaria, Bavaria, 84106, Germany", "class": "place", "type": "postcode", "importance": 0.335 } }, { "x": "11.8637550347042", "y": "48.60840475", "label": "Volkenschwand, Mainburg (VGem), Landkreis Kelheim, Lower Bavaria, Bavaria, 84106, Germany", "bounds": [[48.5789098, 11.8105118], [48.6380194, 11.91133]], "raw": { "place_id": "198858282", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "relation", "osm_id": "1113237", "boundingbox": ["48.5789098", "48.6380194", "11.8105118", "11.91133"], "lat": "48.60840475", "lon": "11.8637550347042", "display_name": "Volkenschwand, Mainburg (VGem), Landkreis Kelheim, Lower Bavaria, Bavaria, 84106, Germany", "class": "place", "type": "postcode", "importance": 0.335 } }, { "x": "17.3844938", "y": "47.1659864", "label": "Petőfi Sándor utca, Doba, Devecseri járás, Veszprém, Central Transdanubia, Transdanubia, 8482, Hungary", "bounds": [[47.1650574, 17.384321], [47.1674555, 17.3845764]], "raw": { "place_id": "117025931", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "way", "osm_id": "177847660", "boundingbox": ["47.1650574", "47.1674555", "17.384321", "17.3845764"], "lat": "47.1659864", "lon": "17.3844938", "display_name": "Petőfi Sándor utca, Doba, Devecseri járás, Veszprém, Central Transdanubia, Transdanubia, 8482, Hungary", "class": "highway", "type": "tertiary", "importance": 0.1 } }, { "x": "17.3836462", "y": "47.1651678", "label": "Rákóczi utca, Doba, Devecseri járás, Veszprém, Central Transdanubia, Transdanubia, 8482, Hungary", "bounds": [[47.1650574, 17.3836462], [47.1651678, 17.384321]], "raw": { "place_id": "137627752", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "way", "osm_id": "262556754", "boundingbox": ["47.1650574", "47.1651678", "17.3836462", "17.384321"], "lat": "47.1651678", "lon": "17.3836462", "display_name": "Rákóczi utca, Doba, Devecseri járás, Veszprém, Central Transdanubia, Transdanubia, 8482, Hungary", "class": "highway", "type": "tertiary", "importance": 0.1 } }, { "x": "-73.723272", "y": "45.71232", "label": "rue des Bâtisseurs / face au 3100, Rue des Bâtisseurs, Terrebonne, Les Moulins, Lanaudière, Quebec, J6X 2J1, Canada", "bounds": [[45.71227, -73.723322], [45.71237, -73.723222]], "raw": { "place_id": "247360889", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "node", "osm_id": "6129484978", "boundingbox": ["45.71227", "45.71237", "-73.723322", "-73.723222"], "lat": "45.71232", "lon": "-73.723272", "display_name": "rue des Bâtisseurs / face au 3100, Rue des Bâtisseurs, Terrebonne, Les Moulins, Lanaudière, Quebec, J6X 2J1, Canada", "class": "highway", "type": "bus_stop", "importance": 0.001, "icon": "https://nominatim.openstreetmap.org/images/mapicons/transport_bus_stop2.p.20.png" } }, { "x": "-73.0929299", "y": "18.4097527", "label": "CENTRE DISPENSAIRE DE CHALON, Route Nationale # 2, 1re Chalon, Commune Miragoane, Arrondissement de Miragoâne, Département des Nippes, Haiti", "bounds": [[18.4097027, -73.0929799], [18.4098027, -73.0928799]], "raw": { "place_id": "6172511", "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "node", "osm_id": "630656110", "boundingbox": ["18.4097027", "18.4098027", "-73.0929799", "-73.0928799"], "lat": "18.4097527", "lon": "-73.0929299", "display_name": "CENTRE DISPENSAIRE DE CHALON, Route Nationale # 2, 1re Chalon, Commune Miragoane, Arrondissement de Miragoâne, Département des Nippes, Haiti", "class": "amenity", "type": "hospital", "importance": 0.001, "icon": "https://nominatim.openstreetmap.org/images/mapicons/health_hospital.p.20.png" } }];
const searchChadwickResults = [{"x":"-111.8504945","y":"40.71684685","label":"2516, Chadwick Street, Sugar House, Salt Lake City, Salt Lake County, Utah, 84106, USA","bounds":[[40.7168063,-111.8505597],[40.7168874,-111.8504293]],"raw":{"place_id":"182514424","licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"way","osm_id":"501552534","boundingbox":["40.7168063","40.7168874","-111.8505597","-111.8504293"],"lat":"40.71684685","lon":"-111.8504945","display_name":"2516, Chadwick Street, Sugar House, Salt Lake City, Salt Lake County, Utah, 84106, USA","class":"building","type":"yes","importance":0.711}}]
const searchChadwickAddress = '2516 Chadwick St, Salt Lake City, UT';

// [40.7563038, -111.8781928]
@inject("stores")
@observer
export class AddressSearchComponent extends React.Component<AddressSearchComponentProps> {
    state = {
        loading: false,
        error: null,
        selectedResult: null,
        address: '',
        results: searchChadwickResults
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSearch = (e: any) => {
        // console.log('handleSearch e', e);
        // console.log('handleSearch this.state', this.state);
        e.preventDefault()
        const { address } = this.state;
        if (!address || address.length < 2) {
            return;
        }

        this.setState({
            selectedResult: null,
            results: null,
            error: null,
            loading: true
        })

        console.log('handleSearch calling geocodeAddress (address):', address);
        geocodeAddress(address)
            .then((results: Array<IGeocodeResponse>) => {
                console.log('handleSearch calling results:', results);
                this.setState({ results, address });
            })
            .catch((error: any) => {
                console.log('handleSearch calling error:', error);
                this.setState({ error });
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    getClickHandler(result: IGeocodeResponse) {
        // console.log('getClickHandler result', result)
        return () => {
            // console.log('clickHandler func result', result)
            this.props.stores!.mapLocation.updateSelectedAddress(result);
            this.setState({
                selectedResult: result,
            });
        }
    }

    getSingleResultMarkup(result: IGeocodeResponse, index:number) {
        // console.log('getSingleResultMarkup',result)
        if (result) {
            const latLng = result.x && result.y ? new LeafLatLng(parseFloat(result.x), parseFloat(result.y)) : undefined;
            const clickHandler = this.getClickHandler(result);
            return (
                <div onClick={clickHandler} key={index} className={`${singleResultCss}`}>
                    <div className={`${labelCss}`}>{result.label}</div>
                    <div className={`${llCss}`}><LatLngTxt llt={latLng} latLngQuickFmt={'short'} /></div>
                </div>
            )
        }
        return null;
    }
    getResults() {
        // console.log('getResults',this.state.results)
        if (this.state.results) {
            const results = this.state.results as unknown as Array<IGeocodeResponse>;
            // console.log('getResults.good')
            return results.map((r: IGeocodeResponse, i:number) => this.getSingleResultMarkup(r, i));
        }
        return [];
    }
    render() {
        // console.log('render. results', this.state.results)
        const results = this.state.results
            ? <div><h3>Results:</h3><code>{this.getResults()}</code></div>
            : <div>NONE</div>

        return (
            <div className={`${outerBoxCss}`}>
                <form onSubmit={this.handleSearch}>
                    <h3 className={`${headingCss}`}>Address Search</h3>
                    <div className="bp3-input-group .modifier">
                        <span className="bp3-icon bp3-icon-search"></span>
                        <input
                            className="bp3-input"
                            name="address"
                            type="search"
                            onChange={this.handleChange}
                            placeholder="Search input"
                            dir="auto" />
                    </div>
                    {results}
                </form>
            </div >
        )
    }
}
