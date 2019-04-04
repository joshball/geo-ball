"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs = __importStar(require("fs"));
exports.readdir = util_1.promisify(fs.readdir);
exports.lstat = util_1.promisify(fs.lstat);
exports.access = util_1.promisify(fs.access);
exports.mkdir = util_1.promisify(fs.mkdir);
exports.readFile = util_1.promisify(fs.readFile);
exports.writeFile = util_1.promisify(fs.writeFile);
exports.CONSTANTS = fs.constants;
exports.exists = (path) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield exports.access(path, exports.CONSTANTS.F_OK);
        return true;
    }
    catch (error) {
        return false;
    }
});
//# sourceMappingURL=fs.js.map