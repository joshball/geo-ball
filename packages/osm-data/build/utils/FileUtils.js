"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
// https://github.com/sindresorhus/filename-reserved-regex/blob/master/index.js
exports.filenamReservedChars = () => (/[<>:"\/\\|?*\x00-\x1F]/g);
exports.filenamReservedWindowsNames = () => (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i);
// https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
exports.regexSpecialChars = /[|\\{}()[\]^$+*?.]/g;
/**
 * https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
 * const escapedString = escapeRegexSpecialChars('how much $ for a unicorn?');
 * //=> 'how much \$ for a unicorn\?'
 * new RegExp(escapedString);
 * @param str
 */
exports.escapeRegexSpecialChars = (str) => str.replace(exports.regexSpecialChars, '\\$&');
/**
 * https://github.com/sindresorhus/trim-repeated/blob/master/index.js
 *
 * Trim a consecutively repeated substring: foo--bar---baz → foo-bar-baz
 *
 * trimRepeated('foo--bar---baz', '-');
 * //=> 'foo-bar-baz'
 *
 * trimRepeated('foo@#@#baz', '@#');
 * //=> 'foo@#baz'
 *
 * @param str
 * @param repStr
 */
exports.trimRepeated = (str, repStr) => str.replace(new RegExp('(?:' + exports.escapeRegexSpecialChars(repStr) + '){2,}', 'g'), repStr);
;
/**
 * https://github.com/sindresorhus/strip-outer
 *
 * Strip a substring from the start/end of a string
 *
 * stripOuter('foobarfoo', 'foo');
 * //=> 'bar'
 *
 * stripOuter('unicorncake', 'unicorn');
 * //=> 'cake'
 *
 * @param input
 * @param subStr
 */
exports.stripOuter = (input, subStr) => {
    const escapedSubStr = exports.escapeRegexSpecialChars(subStr);
    return input.replace(new RegExp(`^${escapedSubStr}|${escapedSubStr}$`, 'g'), '');
};
// https://github.com/sindresorhus/filenamify/blob/master/index.js
// Doesn't make sense to have longer filenames
const MAX_FILENAME_LENGTH = 100;
const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g; // eslint-disable-line no-control-regex
const reRelativePath = /^\.+/;
exports.fileNamify = (str, options = {}) => {
    const replacement = options.replacement === undefined ? '!' : options.replacement;
    if (exports.filenamReservedChars().test(replacement) && reControlChars.test(replacement)) {
        throw new Error('Replacement string cannot contain reserved filename characters');
    }
    str = str.replace(exports.filenamReservedChars(), replacement);
    str = str.replace(reControlChars, replacement);
    str = str.replace(reRelativePath, replacement);
    if (replacement.length > 0) {
        str = exports.trimRepeated(str, replacement);
        str = str.length > 1 ? exports.stripOuter(str, replacement) : str;
    }
    str = exports.filenamReservedWindowsNames().test(str) ? str + replacement : str;
    str = str.slice(0, MAX_FILENAME_LENGTH);
    return str;
};
exports.pathNamify = (path, options) => {
    path = path_1.resolve(path);
    return path_1.join(path_1.dirname(path), exports.fileNamify(path_1.basename(path), options));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0ZpbGVVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF3RDtBQUV4RCwrRUFBK0U7QUFDbEUsUUFBQSxvQkFBb0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDekQsUUFBQSwyQkFBMkIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFFNUYsNEVBQTRFO0FBQy9ELFFBQUEsaUJBQWlCLEdBQUcscUJBQXFCLENBQUM7QUFFdkQ7Ozs7OztHQU1HO0FBQ1UsUUFBQSx1QkFBdUIsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx5QkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUUvRjs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRywrQkFBdUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFBQSxDQUFDO0FBRTlKOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDVSxRQUFBLFVBQVUsR0FBRyxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsRUFBRTtJQUMzRCxNQUFNLGFBQWEsR0FBRywrQkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxhQUFhLElBQUksYUFBYSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEYsQ0FBQyxDQUFBO0FBR0Qsa0VBQWtFO0FBRWxFLDhDQUE4QztBQUM5QyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztBQUVoQyxNQUFNLGNBQWMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDLHVDQUF1QztBQUMvRixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7QUFFakIsUUFBQSxVQUFVLEdBQUcsQ0FBQyxHQUFXLEVBQUUsVUFBZSxFQUFFLEVBQUUsRUFBRTtJQUU1RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBRWxGLElBQUksNEJBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNqRixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7S0FDbEY7SUFFRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyw0QkFBb0IsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMvQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFL0MsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUMzQixHQUFHLEdBQUcsb0JBQVksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBVSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQzFEO0lBRUQsR0FBRyxHQUFHLG1DQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDeEUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFFeEMsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDLENBQUM7QUFFVyxRQUFBLFVBQVUsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFzQixFQUFFLEVBQUU7SUFDbEUsSUFBSSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixPQUFPLFdBQUksQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsa0JBQVUsQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDLENBQUMifQ==