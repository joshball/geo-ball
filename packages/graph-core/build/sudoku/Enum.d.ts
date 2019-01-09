interface IEnum {
    id: number;
    name: string;
    [key: string]: any;
}
interface IEnumDictionary {
    [key: string]: IEnum;
}
export default class Enumitron {
    private _enumArray;
    private _currentIndex;
    length: number;
    [index: number]: IEnum;
    constructor(enumArray: IEnum[]);
    private _assignIndexes;
    private _throwError;
    private _validateUnique;
    readonly asDictionary: IEnumDictionary;
    readonly asIds: number[];
    readonly asNames: string[];
    readonly asObjects: IEnum[];
    getNameById(id: number): string;
    next(): IteratorResult<IEnum | null>;
    [Symbol.iterator](): IterableIterator<IEnum | null>;
}
export {};
