"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Enumitron {
    constructor(enumArray) {
        this._enumArray = [];
        this._currentIndex = 0;
        this.length = 0;
        this._enumArray = this._validateUnique('id', this._validateUnique('name', enumArray));
        this.length = this._enumArray.length;
        this._assignIndexes(this._enumArray);
    }
    _assignIndexes(enumArray) {
        let index = 0;
        for (const item of enumArray) {
            this[index++] = item;
        }
    }
    _throwError(msg) {
        throw new Error(msg);
    }
    _validateUnique(key, enumArray) {
        const distinct = [...Array.from(new Set(enumArray.map(item => item[key])))];
        if (distinct.length !== enumArray.length) {
            return this._throwError(`Enums must have unique ${key}s. ${JSON.stringify(enumArray)}`);
        }
        return enumArray;
    }
    get asDictionary() {
        return this._enumArray.reduce((dict, item) => {
            dict[item.name] = item;
            return dict;
        }, {});
    }
    get asIds() {
        return this._enumArray.map(item => item.id);
    }
    get asNames() {
        return this._enumArray.map(item => item.name);
    }
    get asObjects() {
        return this._enumArray;
    }
    getNameById(id) {
        const result = this._enumArray.find(item => item.id === id);
        if (!result) {
            return this._throwError(`Enum with id ${id} does not exist`);
        }
        return result.name;
    }
    next() {
        if (this._currentIndex < this._enumArray.length) {
            return {
                done: false,
                value: this._enumArray[this._currentIndex++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
exports.default = Enumitron;
//# sourceMappingURL=Enum.js.map