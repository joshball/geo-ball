import * as React from 'react'
import { css } from 'glamor'
import { LatLng } from 'leaflet';
import { LatLngTxt } from '../common/LatLngTxt';
import { observer, inject } from 'mobx-react';
import { MapState } from '../../stores/MapState';
import { colors, fontSizes, fonts } from "../theme"


export interface ChangeMapTilesComponentProps {
    mapState?: MapState;
}

export interface IGeoSearchResult {
    label: string;
    raw: any;
    x: string;
    y: string;
    bounds: Array<Array<number>>;
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

// [40.7563038, -111.8781928]
@inject("mapState")
@observer
export class ChangeMapTilesComponent extends React.Component<ChangeMapTilesComponentProps> {
    state = {
        selected: undefined,
    }

    handleChange = (e: any) => {
        this.setState({
            selected: e.target.value
        })
    }

    handleSearch = (e: any) => {
        // console.log('handleSearch e', e);
        // console.log('handleSearch this.state', this.state);
        e.preventDefault()
        // const { address } = this.state;
        // if (!address || address.length < 2) {
        //     return;
        // }

        // this.setState({
        //     selectedResult: null,
        //     results: null,
        //     error: null,
        //     loading: true
        // })

        // console.log('handleSearch calling geocodeAddress (address):', address);
        // geocodeAddress(address)
        //     .then((results: Array<IGeoSearchResult>) => {
        //         console.log('handleSearch calling results:', results);
        //         this.setState({ results, address });
        //     })
        //     .catch((error: any) => {
        //         console.log('handleSearch calling error:', error);
        //         this.setState({ error });
        //     })
        //     .finally(() => {
        //         this.setState({ loading: false });
        //     })
    }

    // getClickHandler(result: IGeoSearchResult) {
    //     // console.log('getClickHandler result', result)
    //     return () => {
    //         // console.log('clickHandler func result', result)
    //         this.props.mapState!.updateAddress(result);
    //         this.setState({
    //             selectedResult: result,
    //         });
    //     }
    // }

    // getSingleResultMarkup(result: IGeoSearchResult) {
    //     // console.log('getSingleResultMarkup',result)
    //     if (result) {
    //         const latLng = result.x && result.y ? new LatLng(parseFloat(result.x), parseFloat(result.y)) : undefined;
    //         const clickHandler = this.getClickHandler(result);
    //         return (
    //             <div onClick={clickHandler} key={result.x + result.y + result.label} className={`${singleResultCss}`}>
    //                 <div className={`${labelCss}`}>{result.label}</div>
    //                 <div className={`${llCss}`}><LatLngTxt llt={latLng} lltStyle={'shortLng'} /></div>
    //             </div>
    //         )
    //     }
    // }
    // getResults() {
    //     // console.log('getResults',this.state.results)
    //     if (this.state.results) {
    //         const results = this.state.results as unknown as Array<IGeoSearchResult>;
    //         // console.log('getResults.good')
    //         return results.map((r: IGeoSearchResult) => this.getSingleResultMarkup(r));
    //     }
    //     return [];
    // }
    render() {
        // console.log('render. results', this.state.results)
        return (
            <div className={`${outerBoxCss}`}>
                <form onSubmit={this.handleSearch}>
                    <h3 className={`${headingCss}`}>Change Map Tiles</h3>
                    <div className="bp3-select .modifier">
                        <select value={this.state.selected} onChange={this.handleChange}>
                            <option>Choose an item...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                        </select>
                    </div>
                </form>
            </div >
        )
    }
}

