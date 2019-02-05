"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileNamify_1 = require("./fileNamify");
/**
 * This takes an date and gets the ISO string:
 *      2019-02-04T18:08:19.506Z
 * Then converts it to a file system safe name:
 *      2019-02-04_1808.19
 *
 * @param date Date
 */
exports.CreateFilenameTimestamp = (date) => {
    const dateString = date.toISOString(); // '2019-02-04T18:08:19.506Z'
    const split = dateString.split('T'); // [ '2019-02-04', '18:08:19.506Z' ]
    if (split.length !== 2) {
        console.error('This should never happen!', split);
        return fileNamify_1.fileNamify(dateString, { replacement: '_' });
    }
    // REMOVE colons (:) in time portion (split[1])
    // '18:08:19.506Z' => '180819.506Z'
    let time = split[1].replace(/:/g, '');
    // We don't care about the decimal portion, so just pull out the integer:
    // '180819.506Z' => '180819'
    time = time.substr(0, time.indexOf('.'));
    // Put a decimal back in before the seconds
    // '180819' => '1808.19'
    time = time.substr(0, time.length - 2) + '.' + time.substr(time.length - 2);
    // Finally return the file name safe date and time with a _ between
    // '2019-02-04' + '_' + '1808.19' => '2019-02-04_1808.19'
    return `${split[0]}_${time}`; // ​​​​​2019-02-04_1808.19
};
/**
 * Given a string 2019-02-04_1808.19 convert to Date 2019-02-04T18:08:19.506Z
 *
 * @param filenameTimestamp
 */
exports.ParseFilenameTimestamp = (filenameTimestamp) => {
    const split = filenameTimestamp.split('_'); // 2019-02-04_1808.19 => [ '2019-02-04', '1808.19' ]
    if (split.length !== 2) {
        throw new Error('Cannot parse ');
    }
    const t = split[1]; // '1808.19'
    // '1808.19' => (0,2) = '18', (2,2) = '08', (5,2) => '19'
    const timeStr = `${t.substr(0, 2)}:${t.substr(2, 2)}:${t.substr(0, 2)} GMT`; // '18:08:18 GMT'
    const parsableDateTimeStr = `${split[0]} ${timeStr}`;
    return new Date(parsableDateTimeStr);
};
exports.FindParseFilenameTimestamp = (filename) => {
    // 2019-02-04_1808.19
    //  2 0 1 9 - 0 2 - 0 4 _ 1 8 0 8 . 1 9
    // \d\d\d\d\-\d\d\-\d\d\_\d\d\d\d\.\d\d
    const regex = /\d\d\d\d\-\d\d\-\d\d\_\d\d\d\d\.\d\d/g;
    const result = regex.exec(filename);
    if (!result) {
        return undefined;
    }
    // [   '2019-02-04_1808.19',
    //     index: 3,
    //     input: 'foo2019-02-04_1808.19barfoo2019-02-04_1808.19bar',
    //     groups: undefined
    // ]
    const fileTimestamp = result[0];
    const startIndex = result.index;
    const endIndex = startIndex + fileTimestamp.length;
    return {
        fileTimestamp,
        startIndex,
        preStr: fileTimestamp.substr(0, startIndex),
        postStr: fileTimestamp.substr(endIndex),
        endIndex,
        orig: filename,
        date: exports.ParseFilenameTimestamp(fileTimestamp),
    };
};
//# sourceMappingURL=Timestamps.js.map