import * as React from 'react'
import { NominatimParams, INominatimResult } from '@geo-ball/osm-data';

export interface IApiPanelState {
    query: any;
    results: any;
}

export interface IApiPanelProps {
    apiCallback: (query: any) => Promise<any>;
}

export class ApiPanel extends React.Component<IApiPanelProps, IApiPanelState> {
    state: IApiPanelState;
    constructor(props: IApiPanelProps) {
        super(props);
        this.state = {
            results: {},
            query: {},
        };
    }
    fetchIt(params: NominatimParams) {
        return this.props.apiCallback(params)
            .then((results: INominatimResult[]) => {
                this.setState({ results });
            });
    }
    render() {
        return (<div>
            <h1>Query</h1>
            <div>
                <code>this.state.query</code>
            </div>
            <h1>Results</h1>
            <div>
                <code>this.state.results</code>
            </div>
        </div>);
    }
}
