import * as React from 'react';
import { cssProps } from '../../../types/ApiTypes';
import { Switch, Divider } from '../../atoms';

import { SwitchProps } from '../../molecules/SwitchProps/SwitchProps';
import { IDebugParamTogglesGroupProps, DebugParamTogglesGroup } from '../DebugParamTogglesGroup/DebugParamTogglesGroup';

export interface IActionBarDebugTogglesProps {
    /** Thi is the fakeapi callback thingy */
    // mockApiCall: IActionToggle;
    mockApiCall: SwitchProps;
    queryParams?: IDebugParamTogglesGroupProps;
    bodyParams?: IDebugParamTogglesGroupProps;
    headerParams?: IDebugParamTogglesGroupProps;
}

const switchDivStyle = cssProps({
    // float: 'left',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
});

export const DebugToggles = (props: IActionBarDebugTogglesProps) => {
    // const QueryParamToggles = () => ParamToggleGroup(props.queryParams);
    // const BodyParamToggles = () => ParamToggleGroup(props.bodyParams);
    // const FakeTheApiCallSwitch = new ActionToggle(props.mockApiCall).getSwitchComponent(switchStyle);
    // <FakeTheApiCallSwitch />
    // console.log('Debug props', props);
    const { mockApiCall, queryParams, bodyParams, headerParams, ...rest } = props;
    const queryDbg = queryParams ? (<><Divider isVertical /> <Switch {...queryParams.debugForm} /></>) : null;
    const bodyDbg = bodyParams ? (<><Divider isVertical /> <Switch {...bodyParams.debugForm} /></>) : null;
    const headersDbg = headerParams ? (<><Divider isVertical /> <Switch {...headerParams.debugForm} /></>) : null;
    return (
        <div style={switchDivStyle} {...rest}>
            <Switch {...mockApiCall} />
            {queryDbg}
            {bodyDbg}
            {headersDbg}
        </div>
    );
};
// export const DebugToggles = (props: IActionBarDebugTogglesProps) => {
//     // const QueryParamToggles = () => ParamToggleGroup(props.queryParams);
//     // const BodyParamToggles = () => ParamToggleGroup(props.bodyParams);
//     // const FakeTheApiCallSwitch = new ActionToggle(props.mockApiCall).getSwitchComponent(switchStyle);
//     // <FakeTheApiCallSwitch />
//     // console.log('Debug props', props);
//     const { mockApiCall, queryParams, bodyParams, ...rest } = props;
//     return (
//         <div style={switchDivStyle} {...rest}>
//             <Switch {...mockApiCall} />
//             {queryParams ? <DebugParamTogglesGroup {...queryParams} /> : null}
//             {bodyParams ? <DebugParamTogglesGroup {...bodyParams} /> : null}
//         </div>
//     );
// };

// export const DebugToggles = (props: IDebugTogglesProps) => {
//     const switchDivStyle = cssProps({
//         float: 'right',
//         display: 'inline-flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//     })
//     const switchStyle = {
//         margin: '0px 10px 0px 10px',
//     }
//     //
//     const switches = props.actionToggles.map((t, i) => t.getKeyedSwitch(i, switchStyle));

//     return (
//         <div style={switchDivStyle}>
//             {switches}
//         </div>
//     )
// }
