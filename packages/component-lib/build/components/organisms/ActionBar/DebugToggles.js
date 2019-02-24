"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const ApiTypes_1 = require("../../panels/ApiBrowser/ApiTypes");
const ActionToggle_1 = require("../ActionToggle/ActionToggle");
const core_1 = require("@blueprintjs/core");
const switchDivStyle = ApiTypes_1.cssProps({
    float: 'right',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
});
const switchGroupDivStyle = ApiTypes_1.cssProps({
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid black'
});
const switchStyle = {
    margin: '0px 10px 0px 10px',
};
;
exports.ParamToggleGroup = (props) => {
    if (!props) {
        return null;
    }
    const DebugFormToggleSwitch = new ActionToggle_1.ActionToggle(props.debugForm).getSwitchComponent(switchStyle);
    const ViewPanelToggleSwitch = new ActionToggle_1.ActionToggle(props.viewPanel).getSwitchComponent(switchStyle);
    return (React.createElement("div", { style: switchGroupDivStyle },
        React.createElement(core_1.H5, null, props.groupLabel),
        React.createElement(DebugFormToggleSwitch, null),
        React.createElement(ViewPanelToggleSwitch, null)));
};
exports.DebugToggles = (props) => {
    const QueryParamToggles = () => exports.ParamToggleGroup(props.queryParams);
    const BodyParamToggles = () => exports.ParamToggleGroup(props.bodyParams);
    const FakeTheApiCallSwitch = new ActionToggle_1.ActionToggle(props.fakeApiCall).getSwitchComponent(switchStyle);
    return (React.createElement("div", { style: switchDivStyle },
        React.createElement(FakeTheApiCallSwitch, null),
        React.createElement(QueryParamToggles, null),
        React.createElement(BodyParamToggles, null)));
};
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
//# sourceMappingURL=DebugToggles.js.map