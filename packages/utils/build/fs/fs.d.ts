/// <reference types="node" />
import * as fs from 'fs';
export declare const readdir: typeof fs.readdir.__promisify__;
export declare const lstat: typeof fs.lstat.__promisify__;
export declare const access: typeof fs.access.__promisify__;
export declare const mkdir: typeof fs.mkdir.__promisify__;
export declare const readFile: typeof fs.readFile.__promisify__;
export declare const writeFile: typeof fs.writeFile.__promisify__;
export declare const CONSTANTS: typeof fs.constants;
export declare const exists: (path: string) => Promise<boolean>;
//# sourceMappingURL=fs.d.ts.map