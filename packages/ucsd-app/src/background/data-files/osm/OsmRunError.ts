export type OsmRunErrorTxt =
    'DirFilesHaveBadData' |
    'DirHasTooFewFiles' |
    'DirHasTooManyFiles' |
    'DirHasInconsistentFileNames' |
    'DirHasNoFiles' |
    'DirDoesNotExist' |
    'DirImproperlyNamed' |
    'PathWasDirNotFile' |
    'PathWasFileNotDir';

export class OsmRunError extends Error {
    runError: string;
    constructor(message: string, runError: OsmRunErrorTxt) {
        super(message);
        this.runError = runError;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, OsmRunError.prototype);
    }
}

