import * as React from 'react'
import { Map, TileLayer, Rectangle } from 'react-leaflet'

const outer: Array<[number, number]> = [[50.505, -29.09], [52.505, 29.09]]
const inner: Array<[number, number]> = [[49.505, -2.09], [53.505, 2.09]]

// tslint:disable-next-line:interface-over-type-literal
type State = {
    bounds: Array<[number, number]>,
}

// tslint:disable-next-line:interface-over-type-literal
type Props = {}

export default class BoundsExample extends React.Component<Props, State> {

    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            bounds: outer
        };
    }

    onClickInner = () => {
        this.setState({ bounds: inner })
    }

    onClickOuter = () => {
        this.setState({ bounds: outer })
    }

    render() {
        if(!this.state.bounds){
            return;
        }
        console.log('bounds', this.state.bounds)
        return (
            <Map bounds={this.state.bounds}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Rectangle
                    bounds={outer}
                    color={this.state.bounds === outer ? 'red' : 'white'}
                    onClick={this.onClickOuter}
                />
                <Rectangle
                    bounds={inner}
                    color={this.state.bounds === inner ? 'red' : 'white'}
                    onClick={this.onClickInner}
                />
            </Map>
        )
    }
}
