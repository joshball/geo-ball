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
const core_1 = require("@blueprintjs/core");
const ApiStyles_1 = require("../themes/ApiStyles");
class ResultsContainer extends React.Component {
    render() {
        return React.createElement(core_1.Card, { style: ApiStyles_1.cardStyle, interactive: false, elevation: core_1.Elevation.FOUR },
            React.createElement("h4", null, "Results"),
            React.createElement("pre", null, JSON.stringify(this.props.children, null, 4)));
    }
}
exports.ResultsContainer = ResultsContainer;
const AltApiResultsView = (json) => (React.createElement("div", { style: {
        margin: '3rem 0',
        borderRadius: 4,
        background: '#f6f8fa',
        boxShadow: '0 0 1px  #eee inset',
    } },
    React.createElement("div", { style: {
            textTransform: 'uppercase',
            fontSize: 11,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            fontWeight: 500,
            padding: '.5rem',
            background: '#555',
            color: '#fff',
            letterSpacing: '1px',
        } }, "API RESULT"),
    React.createElement("pre", { style: {
            fontSize: '.65rem',
            padding: '.25rem .5rem',
            overflowX: 'scroll',
        } }, JSON.stringify(json, null, 4))));
//# sourceMappingURL=Results.js.map