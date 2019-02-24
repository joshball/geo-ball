"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
require("./Button.css");
/**
 * The only true button.
 */
function Button({ color, size, onClick, disabled, children }) {
    const styles = {
        color,
        fontSize: Button.sizes[size],
    };
    return (react_1.default.createElement("button", { className: "button", style: styles, onClick: onClick, disabled: disabled }, children));
}
exports.Button = Button;
Button.propTypes = {
    /** Button label */
    children: prop_types_1.default.node.isRequired,
    /** The color for the button */
    color: prop_types_1.default.string,
    /** The size of the button */
    size: prop_types_1.default.oneOf(['small', 'normal', 'large']),
    /** Disable button */
    disabled: prop_types_1.default.bool,
    /** Gets called when the user clicks on the button */
    onClick: prop_types_1.default.func,
};
Button.defaultProps = {
    color: '#333',
    size: 'normal',
    onClick: (event) => {
        // eslint-disable-next-line no-console
        console.log('You have clicked me!', event.target);
    },
};
const buttonSizes = {
    small: '10px',
    normal: '14px',
    large: '18px',
};
Button.sizes = buttonSizes;
//# sourceMappingURL=Button.js.map