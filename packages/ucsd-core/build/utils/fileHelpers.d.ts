export declare const findFilePathIn: (filepath: string, dirsToTry: string[]) => string;
export declare const findFilePath: (filepath: string) => string;
export declare const assertFileExists: (filepath: string) => string;
export interface FormatExtension {
    format: OutputFormatType;
    extension: string;
}
export interface KeyVal {
    [key: string]: string;
}
export declare const OutputFormatExtensions: KeyVal;
export declare const OutputFormats: string[];
/** Create a Type */
export declare type OutputFormatType = keyof typeof OutputFormatExtensions;
export declare const isCorrectExt: (filename: string, format: string) => boolean;
export declare const ensureCorrectEnding: (filename: string, ending: string) => string | undefined;
//# sourceMappingURL=fileHelpers.d.ts.map