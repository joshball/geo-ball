import { join, resolve, dirname, basename } from 'path';

// https://github.com/sindresorhus/filename-reserved-regex/blob/master/index.js
export const filenamReservedChars = () => (/[<>:"\/\\|?*\x00-\x1F]/g);
export const filenamReservedWindowsNames = () => (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i);

// https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
export const regexSpecialChars = /[|\\{}()[\]^$+*?.]/g;

/**
 * https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
 * const escapedString = escapeRegexSpecialChars('how much $ for a unicorn?');
 * //=> 'how much \$ for a unicorn\?'
 * new RegExp(escapedString);
 * @param str
 */
export const escapeRegexSpecialChars = (str: string) => str.replace(regexSpecialChars, '\\$&');

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
export const trimRepeated = (str: string, repStr: string): string => str.replace(new RegExp('(?:' + escapeRegexSpecialChars(repStr) + '){2,}', 'g'), repStr);;

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
export const stripOuter = (input: string, subStr: string) => {
	const escapedSubStr = escapeRegexSpecialChars(subStr);
	return input.replace(new RegExp(`^${escapedSubStr}|${escapedSubStr}$`, 'g'), '');
}


// https://github.com/sindresorhus/filenamify/blob/master/index.js

// Doesn't make sense to have longer filenames
const MAX_FILENAME_LENGTH = 100;

const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g; // eslint-disable-line no-control-regex
const reRelativePath = /^\.+/;

export const fileNamify = (str: string, options: any = {}) => {

	const replacement = options.replacement === undefined ? '!' : options.replacement;

	if (filenamReservedChars().test(replacement) && reControlChars.test(replacement)) {
		throw new Error('Replacement string cannot contain reserved filename characters');
	}

	str = str.replace(filenamReservedChars(), replacement);
	str = str.replace(reControlChars, replacement);
	str = str.replace(reRelativePath, replacement);

	if (replacement.length > 0) {
		str = trimRepeated(str, replacement);
		str = str.length > 1 ? stripOuter(str, replacement) : str;
	}

	str = filenamReservedWindowsNames().test(str) ? str + replacement : str;
	str = str.slice(0, MAX_FILENAME_LENGTH);

	return str;
};

export const pathNamify = (path: string, options: any|undefined) => {
	path = resolve(path);
	return join(dirname(path), fileNamify(basename(path), options));
};
