"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
require("./Placeholder.css");
/**
 * Image placeholders.
 */
class Placeholder extends react_1.Component {
    getImageUrl() {
        const { type, width, height } = this.props;
        const types = {
            animal: `http://placeimg.com/${width}/${height}/animals`,
            bacon: `http://baconmockup.com/${width}/${height}`,
            bear: `http://www.placebear.com/${width}/${height}`,
            beard: `http://placebeard.it/${width}/${height}`,
            cat: `http://lorempixel.com/${width}/${height}/cats`,
            city: `http://lorempixel.com/${width}/${height}/city`,
            food: `http://lorempixel.com/${width}/${height}/food`,
            nature: `http://lorempixel.com/${width}/${height}/nature`,
            people: `http://lorempixel.com/${width}/${height}/people`,
        };
        return types[type];
    }
    render() {
        const { width, height } = this.props;
        return (react_1.default.createElement("img", { className: "placeholder", src: this.getImageUrl(), width: width, height: height, alt: "" }));
    }
}
Placeholder.propTypes = {
    type: prop_types_1.default.oneOf([
        'animal',
        'bacon',
        'beard',
        'bear',
        'cat',
        'food',
        'city',
        'nature',
        'people',
    ]),
    width: prop_types_1.default.number,
    height: prop_types_1.default.number,
};
Placeholder.defaultProps = {
    type: 'animal',
    width: 150,
    height: 150,
};
exports.default = Placeholder;
//# sourceMappingURL=Placeholder.js.map