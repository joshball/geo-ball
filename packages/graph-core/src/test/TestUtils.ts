export const dumpBothArrays = (actual: any, expected: any): void => {
    // console.log('expected:\n', JSON.stringify(expectedBoxes, undefined, 4));
    for (let i = 0; i < actual.length; i++) {
        console.log(' ACTUAL: ', actual[i]);
        console.log(' EXPECT: ', expected[i]);
    }
};
