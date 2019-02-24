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
class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        e.preventDefault();
        this.props.openUrlCb(this.props.helpUrl);
    }
    render() {
        const headerDiv = {
            display: 'flex',
            padding: '20px 50px 20px 40px',
            marginBottom: '10px',
            justifyContent: 'space-between',
        };
        const headerName = {
            fontFamily: "Fira Code, Operator Mono, -apple-system, Helvetica Neue, Segoe UI, Roboto, Liberation Sans",
            fontWeight: 700,
            fontSize: '36px'
        };
        const headerHelp = {
            display: 'inline-block',
        };
        return (React.createElement("div", { style: headerDiv },
            React.createElement("div", { style: headerName }, this.props.name),
            React.createElement("div", { style: headerHelp },
                React.createElement("a", { href: "{this.props.helpUrl}", onClick: this.onClick }, this.props.helpUrl))));
    }
}
exports.HeaderContainer = HeaderContainer;
//# sourceMappingURL=Header.js.map