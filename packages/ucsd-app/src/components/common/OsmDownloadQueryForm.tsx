import * as React from 'react'

import { Intent, Label, Classes, TextArea, InputGroup, Button } from '@blueprintjs/core';
import { LatLng, LatLngBounds } from 'leaflet';


export interface OsmDownloadQueryFormProps {
    downloadOsmFile: any;
    bounds: LatLngBounds;
}
export interface OsmDownloadQueryFormState {
    name: string;
    desc: string;
    [key: string]: string;
}

export class OsmDownloadQueryForm extends React.Component<OsmDownloadQueryFormProps, OsmDownloadQueryFormState> {
    state: OsmDownloadQueryFormState;
    constructor(props: OsmDownloadQueryFormProps) {
        super(props);
        this.state = {
            name: '',
            desc: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event: any) {
        event.preventDefault();
        if (!this.state.name) {
            this.setState({
                name: 'SET_A_NAME'
            });
            return;
        }
        this.props.downloadOsmFile({
            name: this.state.name,
            desc: this.state.desc,
            bounds: this.props.bounds,
        });
    }
    render() {
        return (<form onSubmit={this.handleSubmit}>
            <Label>
                Query Name
                <InputGroup name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name for query" style={{ width: '100%' }} />
            </Label>
            <Label>
                Query Description
                <TextArea name="desc" value={this.state.desc} onChange={this.handleChange} large={true} placeholder="Description for query" intent={Intent.PRIMARY} style={{ width: '100%' }} />
            </Label>

            <Button type="submit" intent={Intent.PRIMARY}>Download OSM</Button>
            <Button className="bp3-popover-dismiss">Cancel</Button>
        </form>);
    }
}
