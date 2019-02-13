import { IOsmRunDir } from "./OsmRunDir";
export declare class OsmRuns {
    osmRunDirPath: string;
    constructor(osmRunDirPath: string);
    fetchAll(): Promise<Array<IOsmRunDir>>;
    createRun(): Promise<void>;
    fetchRun(_date: Date): IOsmRunDir;
    deleteRun(_run: IOsmRunDir): void;
}
//# sourceMappingURL=OsmRuns.d.ts.map