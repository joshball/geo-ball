import { resolve, join } from 'path';
import { LocalDateTime, readdir, mkdir, exists } from '@geo-ball/utils';
import { IGeographicBoundsDescription } from '@geo-ball/osm-data';
import { OsmFetchDir, IOsmFetchDir } from './OsmFetchDir';

export interface IOsmFetchManager {
    fetchRootPath: string;
    osmFetchDirs: Array<IOsmFetchDir>;
}

export class OsmFetchManager {
    fetchRootPath: string;
    osmFetchDirs: Array<OsmFetchDir>;

    constructor(fetchRootPath: string) {
        this.fetchRootPath = resolve(fetchRootPath);
        this.osmFetchDirs = [];
    }

    public async createFetchDir(ldt: LocalDateTime) {
        const fetchDirPath = join(this.fetchRootPath, ldt.filename);
        if (await !exists(fetchDirPath)) {
            await mkdir(fetchDirPath, { recursive: true });
        }
        const fd = new OsmFetchDir(fetchDirPath);
        await fd.load();
        this.osmFetchDirs.push(fd);
        this.osmFetchDirs.sort();
    }

    public async getOsmFetchDirs(): Promise<Array<OsmFetchDir>> {
        return readdir(this.fetchRootPath).then(fetchDirs =>
            fetchDirs.map(fetchDir => new OsmFetchDir(join(this.fetchRootPath, fetchDir))),
        );
    }

    public async load(): Promise<Array<OsmFetchDir>> {
        return this.getOsmFetchDirs()
            .then(dirs => (this.osmFetchDirs = dirs))
            .then(dirs => {
                return Promise.all(dirs.map(dir => dir.load()))
                    .then(() => this.dump())
                    .then(() => dirs);
            });
    }

    public dump(): string {
        const d = JSON.stringify(this, undefined, 4);
        console.log('DUMP:');
        console.log(d);
        return d;
    }
}

export interface IOsmFetchAndSaveParams {
    osmServer: string;
    queryDate: LocalDateTime;
    geoBounds: IGeographicBoundsDescription;
    fetchDir: string;
    overwrite: boolean;
    fake: boolean;
}
