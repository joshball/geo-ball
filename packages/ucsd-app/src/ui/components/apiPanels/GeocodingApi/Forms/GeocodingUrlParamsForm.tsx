import * as React from 'react';

import { InformedInputField, Card, Heading } from '@geo-ball/component-lib';
import { INominatimQuery, INominatimSettings, INominatimToggles } from '@geo-ball/osm-data';
import { GetNomantimSearchAddressSection } from './GeocodingApiAddressForm';
// import { GeocodingApiAddressForm } from './GeocodingApiAddressForm';
// import { GeocodingApiTogglesForm } from './GeocodingApiTogglesForm';
// import { GeocodingApiSettingsForm } from './GeocodingApiTogglesForm';

// import { Form, FormProps, FormState } from 'informed';

export interface IGeocodingUrlParamsFormValues {
    query: INominatimQuery;
    settings: INominatimSettings;
    toggles: INominatimToggles;
}

// export const GeocodingUrlParamsForm: React.FunctionComponent<InformedComponentParams> = ({
export const GeocodingUrlParamsForm: React.FunctionComponent<any> = ({ ...props }) => {
    console.log('@@@@@ GeocodingUrlParamsForm.props', props);
    return (
        <React.Fragment>
            <Card elevation="400">
                {GetNomantimSearchAddressSection(props)}
                <Card style={{ width: '100%' }} elevation="200">
                    <Heading use="h2">Settings</Heading>
                    <Heading use="h3">Toggles</Heading>
                    {/* {GetNomantimSettingsForm()}
                    {GetNomantimTogglesForm()} */}
                </Card>
            </Card>
            {/* <InformedInputField label="IDDD" field="id" {...props} />
            <InformedInputField
                label="Count"
                field="count"
                type="number"
                {...props}
            /> */}
        </React.Fragment>
    );
};

{
    /* <Heading>Heading 1</Heading>
<Heading use="h2">Heading 2</Heading>
<Heading use="h3">Heading 3</Heading>
<Heading use="h4">Heading 4</Heading>
<Heading use="h5">Heading 5</Heading>
<Heading use="h6">Heading 6</Heading> */
}
