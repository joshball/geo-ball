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
const glamor_1 = require("glamor");
const ApiStyles_1 = require("../themes/ApiStyles");
class ApiUrlParametersView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            this.setState({ isOpen: !this.state.isOpen });
        };
        this.state = {
            isOpen: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const mainFormWrapDiv = {
            display: 'flex',
        };
        const colCard = {
            flexGrow: 1,
            margin: ' 0px 10px 0px 10px ',
            flex: '1 1 0',
        };
        const mainQueryStyle = glamor_1.css({
            display: 'flex',
            flexDirection: 'row',
            // margin: '10px',
            padding: '10px',
        });
        const queryColStyle = glamor_1.css({
            display: 'block',
            overflowWrap: 'break-word',
            overflow: 'auto',
        });
        const qp = this.getQueryParams(this.props.formData);
        return React.createElement(core_1.Card, { style: ApiStyles_1.cardStyle, interactive: false, elevation: core_1.Elevation.FOUR },
            React.createElement("div", Object.assign({}, mainQueryStyle),
                React.createElement(core_1.Collapse, { isOpen: this.state.isOpen },
                    React.createElement(core_1.Card, { style: colCard, interactive: false, elevation: core_1.Elevation.TWO },
                        React.createElement("div", Object.assign({}, queryColStyle),
                            React.createElement("pre", null, JSON.stringify(this.props.formData, null, 4)))),
                    React.createElement(core_1.Card, { style: colCard, interactive: false, elevation: core_1.Elevation.TWO },
                        React.createElement("div", Object.assign({}, queryColStyle),
                            React.createElement("pre", null, JSON.stringify(qp.map, null, 4)))),
                    React.createElement(core_1.Card, { style: colCard, interactive: false, elevation: core_1.Elevation.TWO },
                        React.createElement("div", Object.assign({}, queryColStyle),
                            React.createElement("pre", null, qp.map.join('\n')))))),
            React.createElement("div", null,
                "EnodedURL: ",
                React.createElement("pre", null, qp.url)));
    }
    getQueryParams(obj) {
        const map = Object.keys(obj)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
        return {
            map,
            url: map.join('&')
        };
    }
}
exports.ApiUrlParametersView = ApiUrlParametersView;
class ApiFormParametersView extends React.Component {
    render() {
        return React.createElement("div", null, "ApiFormParametersView");
    }
}
exports.ApiFormParametersView = ApiFormParametersView;
//# sourceMappingURL=Parameters.js.map