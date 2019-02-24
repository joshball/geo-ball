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
const fannypack_1 = require("fannypack");
const default_1 = require("../../themes/default");
class ApiPanelLayoutContainer extends React.Component {
    render() {
        const panelStyle = {
            minHeight: 'calc(100vh - 100px)',
            padding: '10px',
        };
        return (React.createElement(fannypack_1.ThemeProvider, { theme: default_1.theme },
            React.createElement(fannypack_1.Container, { breakpoint: "fullHD", style: panelStyle },
                React.createElement(fannypack_1.LayoutSet, null, this.props.children))));
    }
}
exports.ApiPanelLayoutContainer = ApiPanelLayoutContainer;
//# sourceMappingURL=Layout.js.map