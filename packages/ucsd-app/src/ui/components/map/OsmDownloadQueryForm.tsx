import * as React from 'react'

import { Intent, Label, Icon, TextArea, InputGroup, Button, Checkbox, Alignment } from '@blueprintjs/core';

import { DownloadOsmParams } from '../../services/OsmService';
import { reverseGeocodeLocation, IReverseGeocodeResponse } from '../../services/GeocodingService';
import { LatLngBounds, LatLng } from '@geo-ball/geo-core';


export interface OsmDownloadQueryFormProps {
    downloadOsmFile: (osmParams: DownloadOsmParams) => void;
    bounds: LatLngBounds;
    area: string;
    center: LatLng;
}
export interface OsmDownloadQueryFormState {
    name: string;
    desc: string;
    revGeocode: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    county: string;
    downloadEnabled: boolean;
    [key: string]: string | boolean;
}

export class OsmDownloadQueryForm extends React.Component<OsmDownloadQueryFormProps, OsmDownloadQueryFormState> {
    state: OsmDownloadQueryFormState;
    constructor(props: OsmDownloadQueryFormProps) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            revGeocode: '',
            neighborhood: '',
            city: '',
            state: '',
            county: '',
            downloadEnabled: true,
            zip: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reverseGeocode = this.reverseGeocode.bind(this);
        this.handleDownloadCheck = this.handleDownloadCheck.bind(this);
    }
    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleDownloadCheck(event: any) {
        this.setState({
            downloadEnabled: event.target.checked
        });
    }
    reverseGeocode(_event: any) {
        console.log('this.props', this.props)
        reverseGeocodeLocation(this.props.center)
            .then((revGeocode: IReverseGeocodeResponse) => {
                console.log('reverseGeocode', revGeocode);
                const desc = this.state.desc + '\n' + JSON.stringify(revGeocode.address, undefined, 4);
                this.setState({
                    revGeocode: JSON.stringify(revGeocode),
                    neighborhood: revGeocode.address.neighbourhood,
                    city: revGeocode.address.city,
                    state: revGeocode.address.state,
                    zip: revGeocode.address.postcode,
                    county: revGeocode.address.county,
                    desc
                });
            })
    }
    handleSubmit(event: any) {
        event.preventDefault();
        if (!this.state.name) {
            const name = this.state.neighborhood ||
                this.state.city ||
                this.state.county ||
                this.state.state ||
                this.state.zip ||
                'SET_A_NAME';

            this.setState({
                name
            });
            return;
        }
        this.props.downloadOsmFile({
            name: this.state.name,
            desc: this.state.desc,
            area: this.props.area,
            bounds: this.props.bounds,
            center: this.props.center,
            fake: !this.state.downloadEnabled,
        });
    }
    render() {
        return (<form onSubmit={this.handleSubmit}>
            <Label>
                <strong style={{ fontSize: '1.3em' }}>Query Name</strong>
                <InputGroup name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name for query" style={{ width: '100%' }} />
            </Label>
            <Label>
                <Checkbox style={{ float: 'right' }} alignIndicator={Alignment.RIGHT} checked={this.state.downloadEnabled} onChange={this.handleDownloadCheck}>
                    <Icon icon="download" />&nbsp;&nbsp;<strong>Fake the query</strong>
                </Checkbox>
            </Label>
            <Label>
                <strong style={{ fontSize: '1.3em' }}>Query Description</strong>
                <TextArea name="desc" value={this.state.desc} onChange={this.handleChange} large={true} placeholder="Description for query" intent={Intent.PRIMARY} style={{ width: '100%', height: '350px' }} />
            </Label>

            <Button type="submit" intent={Intent.PRIMARY}>Download OSM</Button>
            <Button onClick={this.reverseGeocode} intent={Intent.PRIMARY}>Reverse Geocode</Button>
            <Button className="bp3-popover-dismiss">Cancel</Button>
        </form>);
    }
}
