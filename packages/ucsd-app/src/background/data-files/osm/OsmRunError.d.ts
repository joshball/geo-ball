export declare type OsmRunErrorTxt =
    | 'DirFilesHaveBadData'
    | 'DirHasTooFewFiles'
    | 'DirHasTooManyFiles'
    | 'DirHasInconsistentFileNames'
    | 'DirHasNoFiles'
    | 'DirDoesNotExist'
    | 'DirImproperlyNamed'
    | 'PathWasDirNotFile'
    | 'PathWasFileNotDir';
export declare class OsmRunError extends Error {
    runError: string;
    constructor(message: string, runError: OsmRunErrorTxt);
}
//# sourceMappingURL=OsmRunError.d.ts.map
