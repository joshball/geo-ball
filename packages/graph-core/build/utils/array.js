"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = (array) => {
    return array.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? exports.flatten(curr) : curr), []);
};
exports.flattenOneLevel = (array) => {
    return array.reduce((prev, curr) => prev.concat(curr), []);
};
//# sourceMappingURL=array.js.map