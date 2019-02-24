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
// import { Card, Elevation } from '@blueprintjs/core';
const fannypack_1 = require("fannypack");
const ActionButton_1 = require("../ActionButton/ActionButton");
const DebugToggles_1 = require("./DebugToggles");
/**
 * This bar holds all the actions
 * @param props IActionBarProps
 */
exports.ActionBar = (props) => {
    const actionBarDivStyle = {
        overflow: 'hidden',
        height: '30px',
    };
    console.log('ActionBar PROPS:', props);
    const actionButton = new ActionButton_1.ActionButton(props.requestButton);
    const ButtonProps = actionButton.getButton();
    return (React.createElement(fannypack_1.Card, null,
        React.createElement("div", { style: actionBarDivStyle },
            React.createElement(DebugToggles_1.DebugToggles, Object.assign({}, props.debugToggles)),
            ButtonProps)));
};
// export interface ISubmitRequestButtonState {
//     submitting: boolean;
// }
// export class SubmitRequestButton extends React.Component<IActionBarProps, ISubmitRequestButtonState> {
//     state: ISubmitRequestButtonState;
//     constructor(props: IActionBarProps) {
//         super(props)
//         this.state = { submitting: false }
//         this.onClick = this.onClick.bind(this);
//     }
//     async onClick() {
//         console.log('onClick!')
//         this.setState({ submitting: true, });
//         try { await this.props.makeRequest(); }
//         finally {
//             this.setState({ submitting: false, });
//         }
//     }
//     render() {
//         /** @type {{search: React.CSSProperties}} */
//         const buttonDiv = {
//             float: 'right' as FloatProperty,
//             display: 'inline-flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100%',
//             marginRight: '75px',
//             marginLeft: '75px',
//         }
//         return (
//             <div style={buttonDiv}>
//                 <Button
//                     disabled={this.state.submitting}
//                     onClick={this.onClick}
//                     intent={Intent.PRIMARY}
//                 >
//                     Make the request
//                 </Button>
//             </div>
//         );
//     }
// }
//# sourceMappingURL=ActionBar.js.map