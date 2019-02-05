"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fileNamify_1 = require("./fileNamify");
exports.pathNamify = (path, options) => {
    path = path_1.resolve(path);
    return path_1.join(path_1.dirname(path), fileNamify_1.fileNamify(path_1.basename(path), options));
};
//# sourceMappingURL=pathNamify.js.map