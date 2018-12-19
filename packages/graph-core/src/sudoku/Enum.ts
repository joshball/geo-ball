interface IEnum {
    id: number;
    name: string;
    [key: string]: any;
}

interface IEnumDictionary {
    [key: string]: IEnum;
}

export default class Enumitron {
    private _enumArray: IEnum[] = [];
    private _currentIndex = 0;
    public length: number = 0;
    [index: number]: IEnum;

    constructor(enumArray: IEnum[]) {
        this._enumArray = this._validateUnique(
            'id',
            this._validateUnique('name', enumArray)
        );
        this.length = this._enumArray.length;
        this._assignIndexes(this._enumArray);
    }

    private _assignIndexes(enumArray: IEnum[]) {
        let index = 0;
        for (const item of enumArray) {
            this[index++] = item;
        }
    }

    private _throwError(msg: string): never {
        throw new Error(msg);
    }

    private _validateUnique(key: string, enumArray: IEnum[]): IEnum[] {
        const distinct = [...Array.from(new Set(enumArray.map(item => item[key])))];
        if (distinct.length !== enumArray.length) {
            return this._throwError(
                `Enums must have unique ${key}s. ${JSON.stringify(enumArray)}`
            );
        }
        return enumArray;
    }

    public get asDictionary(): IEnumDictionary {
        return this._enumArray.reduce((dict: IEnumDictionary, item: IEnum) => {
            dict[item.name] = item;
            return dict;
        }, {});
    }

    public get asIds(): number[] {
        return this._enumArray.map(item => item.id);
    }

    public get asNames(): string[] {
        return this._enumArray.map(item => item.name);
    }

    public get asObjects(): IEnum[] {
        return this._enumArray;
    }

    public getNameById(id: number): string {
        const result = this._enumArray.find(item => item.id === id);
        if (!result) {
            return this._throwError(`Enum with id ${id} does not exist`);
        }
        return result.name;
    }

    public next(): IteratorResult<IEnum | null> {
        if (this._currentIndex < this._enumArray.length) {
            return {
                done: false,
                value: this._enumArray[this._currentIndex++]
            };
        } else {
            return {
                done: true,
                value: null
            };
        }
    }

    public [Symbol.iterator](): IterableIterator<IEnum | null> {
        return this;
    }
}
