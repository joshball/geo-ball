export declare const filenamReservedChars: () => RegExp;
export declare const filenamReservedWindowsNames: () => RegExp;
export declare const regexSpecialChars: RegExp;
/**
 * https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
 * const escapedString = escapeRegexSpecialChars('how much $ for a unicorn?');
 * //=> 'how much \$ for a unicorn\?'
 * new RegExp(escapedString);
 * @param str
 */
export declare const escapeRegexSpecialChars: (str: string) => string;
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
export declare const trimRepeated: (str: string, repStr: string) => string;
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
export declare const stripOuter: (input: string, subStr: string) => string;
export declare const fileNamify: (str: string, options?: any) => string;
export declare const pathNamify: (path: string, options: any) => string;
