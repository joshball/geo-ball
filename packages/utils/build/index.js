"use strict";
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./fs/fs"));
__export(require("./files/fileNamify"));
__export(require("./files/pathNamify"));
__export(require("./time/LocalDateTime"));
//# sourceMappingURL=index.js.map