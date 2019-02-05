/**
 * This takes an date and gets the ISO string:
 *      2019-02-04T18:08:19.506Z
 * Then converts it to a file system safe name:
 *      2019-02-04_1808.19
 *
 * @param date Date
 */
export declare const CreateFilenameTimestamp: (date: Date) => string;
/**
 * Given a string 2019-02-04_1808.19 convert to Date 2019-02-04T18:08:19.506Z
 *
 * @param filenameTimestamp
 */
export declare const ParseFilenameTimestamp: (filenameTimestamp: string) => Date;
export interface ParsedFilenameTimestamp {
    fileTimestamp: string;
    preStr: string;
    postStr: string;
    startIndex: number;
    endIndex: number;
    orig: string;
    date: Date;
}
export declare const FindParseFilenameTimestamp: (filename: string) => ParsedFilenameTimestamp | undefined;
//# sourceMappingURL=Timestamps.d.ts.map