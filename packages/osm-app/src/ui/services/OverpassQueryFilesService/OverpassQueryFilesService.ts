import {
    IDataFileManagerService,
    IFileTypedDirectoryContents,
} from 'react-data-file-manager';
import { getDirContents } from './OverpassQueryFilesService.data';

// import {
//     OverpassQueryFile,
//     IOverpassQueryFile,
//     IOverpassQueryFileContents,
// } from '.';

export interface IOverpassDataDirContents
    extends IFileTypedDirectoryContents<IOverpassQueryFileContents> {
    // path: string;
    // files: Array<IFileContentsWrapper<IOverpassQueryFileContents>>;
}

export interface IOverpassQueryFilesService
    extends IDataFileManagerService<IOverpassQueryFileContents> {}

export class OverpassQueryFilesService
    implements IDataFileManagerService<IOverpassQueryFileContents> {
    path: string;
    dir: IOverpassDataDirContents;

    constructor(path: string) {
        console.log('OverpassQueryFilesService(path)', path);
        this.path = path;
        this.dir = getDirContents(this.path);
    }

    getDirContent(): Promise<IOverpassDataDirContents> {
        this.dir.files.sort();
        return Promise.resolve(this.dir);
    }

    createPlaceholderFile(): IOverpassQueryFile {
        console.log('OverpassQueryFilesService.createPlaceholderFile');
        const newFilename = this.getNewFilename();
        const newFile = new OverpassQueryFile(newFilename, this.path);
        // this.dir.files.push(newFile);
        // this.dir.files.sort();
        // return Promise.resolve(newFile);
        return newFile;
    }

    saveFile(
        file: IOverpassQueryFile,
        newFile: boolean = false
    ): Promise<IOverpassDataDirContents> {
        console.log('OverpassQueryFilesService.saveFile', file);
        if (newFile) {
            this.dir.files.push(file);
        } else {
            const index = this.dir.files.findIndex(
                f => f.filename === file.filename
            );
            if (index < 0) {
                console.error('Could not find file in files', file, this.dir);
                throw new Error('could not find file!');
            }
            this.dir.files[index] = file;
        }
        return Promise.resolve(this.dir);
    }

    renameFile(
        file: IOverpassQueryFile,
        newFilename: string
    ): Promise<IOverpassDataDirContents> {
        console.log(
            'OverpassQueryFilesService.renameFile()',
            file.filename,
            file
        );
        if (this.fileExists(newFilename)) {
            console.error(
                'Weird, just created new file and it already exists? hmmmm'
            );
            console.error('files', this.path, this.dir, newFilename);
            throw new Error('File exists!');
        }
        file.filename = newFilename;
        file.id = newFilename.toLowerCase();
        return Promise.resolve(this.dir);
    }

    deleteFile(file: IOverpassQueryFile): Promise<IOverpassDataDirContents> {
        console.log('OverpassQueryFilesService.DELETE()', file.filename, file);
        const index = this.dir.files.findIndex(
            f => f.filename === file.filename
        );
        this.dir.files.splice(index, 1);
        return Promise.resolve(this.dir);
    }

    private getNewFilename(): string {
        const nowEpoch = Date.now();
        const filename = `Unicorn-${nowEpoch}.json`;
        if (this.fileExists(filename)) {
            console.error(
                'Weird, just created new file and it already exists? hmmmm'
            );
            console.error('files', this.path, this.dir, filename);
            throw new Error('File exists!');
        }
        return filename;
    }

    private fileExists(filename: string): boolean {
        const id = filename.toLowerCase();
        return (
            this.dir.files.findIndex((f: IOverpassQueryFile) => f.id === id) >=
            0
        );
    }
}
