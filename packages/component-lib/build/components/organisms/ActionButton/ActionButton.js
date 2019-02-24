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
class ActionButton {
    constructor(actionButton) {
        this.getButton = (props) => React.createElement(core_1.Button, Object.assign({}, props, { disabled: this.disabled, onClick: this.execute, intent: this.intent }), this.label);
        this.hide = actionButton.hide || false;
        this.disabled = actionButton.disabled || false;
        this.intent = actionButton.intent || core_1.Intent.PRIMARY;
        this.label = actionButton.label;
        this.execute = actionButton.execute;
    }
}
exports.ActionButton = ActionButton;
//# sourceMappingURL=ActionButton.js.map