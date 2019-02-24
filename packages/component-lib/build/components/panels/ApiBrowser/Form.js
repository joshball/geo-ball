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
const ApiStyles_1 = require("../../themes/ApiStyles");
class FormContainer extends React.Component {
    render() {
        return React.createElement(core_1.Card, { style: ApiStyles_1.cardStyle, interactive: false, elevation: core_1.Elevation.FOUR }, this.props.children);
    }
}
exports.FormContainer = FormContainer;
//# sourceMappingURL=Form.js.map