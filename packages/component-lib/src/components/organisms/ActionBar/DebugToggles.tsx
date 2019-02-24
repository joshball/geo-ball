import * as React from 'react'
import { cssProps } from '../../panels/ApiBrowser/ApiTypes';
import { ActionToggle, IActionToggle } from '../ActionToggle/ActionToggle';
import { Switch, H5 } from '@blueprintjs/core';

const switchDivStyle = cssProps({
    float: 'right',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
})
const switchGroupDivStyle = cssProps({
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid black'
})
const switchStyle = {
    margin: '0px 10px 0px 10px',
}



export interface IDebugParamTogglesGroupProps {
    debugForm: IActionToggle;
    viewPanel: IActionToggle;
    groupLabel: string;
};


export interface IActionBarDebugTogglesProps {
    /** Thi is the fakeapi callback thingy */
    fakeApiCall: IActionToggle;
    queryParams?: IDebugParamTogglesGroupProps;
    bodyParams?: IDebugParamTogglesGroupProps;
}

export const ParamToggleGroup = (props?: Optional<IDebugParamTogglesGroupProps>) => {
    if (!props) {
        return null;
    }
    const DebugFormToggleSwitch = new ActionToggle(props.debugForm).getSwitchComponent(switchStyle);
    const ViewPanelToggleSwitch = new ActionToggle(props.viewPanel).getSwitchComponent(switchStyle);
    return (
        <div style={switchGroupDivStyle}>
            <H5>{props.groupLabel}</H5>
            <DebugFormToggleSwitch />
            <ViewPanelToggleSwitch />
        </div>
    )
}

export const DebugToggles = (props: IActionBarDebugTogglesProps) => {
    const QueryParamToggles = () => ParamToggleGroup(props.queryParams);
    const BodyParamToggles = () => ParamToggleGroup(props.bodyParams);
    const FakeTheApiCallSwitch = new ActionToggle(props.fakeApiCall).getSwitchComponent(switchStyle);
    return (
        <div style={switchDivStyle}>
            <FakeTheApiCallSwitch />
            <QueryParamToggles />
            <BodyParamToggles />
        </div>
    )
}

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
