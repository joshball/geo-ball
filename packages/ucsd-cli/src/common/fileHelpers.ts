import { resolve, join, isAbsolute, basename, dirname, extname } from 'path';
import { existsSync } from 'fs';
import { BaseDataPath } from './defaults';

export const findFilePathIn = (filepath: string, dirsToTry: Array<string>): string => {
	// tslint:disable-next-line:prefer-for-of
	for (let i = 0; i < dirsToTry.length; i++) {
		const resolvedPath = resolve(join(dirsToTry[i], filepath));
		if (existsSync(resolvedPath)) {
			return resolvedPath;
		}
	}
	throw new Error(`Could not find any files matching path from [${filepath}]`)
}

export const findFilePath = (filepath: string): string => {
	if (isAbsolute(filepath)) {
		return assertFileExists(filepath);
	}
	return findFilePathIn(filepath, [process.cwd(), BaseDataPath]);
}

export const assertFileExists = (filepath: string): string => {
	const resolvedPath = resolve(filepath);
	if (!existsSync(resolvedPath)) {
		throw new Error(`File [${resolvedPath}] does not exist`)
	}
	return resolvedPath;
}

export interface FormatExtension {
	format: OutputFormatType;
	extension: string;
}
export interface KeyVal {
	[key: string]: string;
}
export const OutputFormatExtensions: KeyVal = {
	json: 'json',
	text: 'txt',
};

export const OutputFormats = Object.keys(OutputFormatExtensions);

/** Create a Type */
export type OutputFormatType = keyof typeof OutputFormatExtensions;



export const isCorrectExt = (filename: string, format: string): boolean => {
	if (filename) {
		const extWithPeriod = '.' + format.toLowerCase();
		if (extname(filename).toLowerCase() === extWithPeriod) {
			return true;
		}
	}
	return false;
}

export const ensureCorrectEnding = (filename: string, ending: string): string | undefined => {
	if (filename) {
		const extWithPeriod = '.' + ending.toLowerCase();
		const fLen = filename.length;
		const eLen = ending.length;
		const startOfEnding = fLen - eLen;
		const filenameStrTooSmall = () => fLen < eLen;
		const endOfFilenameNotExtName = () => filename.slice(startOfEnding).toLowerCase() !== extWithPeriod;
		if (filenameStrTooSmall() || endOfFilenameNotExtName()) {
			return filename + extWithPeriod;
		}
	}
	return undefined;
}
