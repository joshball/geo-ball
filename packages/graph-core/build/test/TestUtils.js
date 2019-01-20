"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpBothArrays = (actual, expected) => {
    // console.log('expected:\n', JSON.stringify(expectedBoxes, undefined, 4));
    for (let i = 0; i < actual.length; i++) {
        console.log(' ACTUAL: ', actual[i]);
        console.log(' EXPECT: ', expected[i]);
    }
};
//# sourceMappingURL=TestUtils.js.map