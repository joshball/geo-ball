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
class KeyedSwitch extends core_1.Switch {
}
exports.KeyedSwitch = KeyedSwitch;
class ActionToggle {
    constructor(at) {
        this.getSwitch = (switchStyle) => React.createElement(core_1.Switch, { style: switchStyle, checked: this.value, label: this.label, onChange: this.toggle });
        this.getSwitchComponent = (switchStyle) => () => this.getSwitch(switchStyle);
        this.getKeyedSwitch = (key, switchStyle) => React.createElement(KeyedSwitch, { key: key, style: switchStyle, checked: this.value, label: this.label, onChange: this.toggle });
        this.hide = at.hide || false;
        this.disabled = at.disabled || false;
        this.value = at.value || false;
        this.label = at.label;
        this.toggle = at.toggle;
    }
}
exports.ActionToggle = ActionToggle;
//# sourceMappingURL=ActionToggle.js.map