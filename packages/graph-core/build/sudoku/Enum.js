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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdWRva3UvRW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLE1BQXFCLFNBQVM7SUFNMUIsWUFBWSxTQUFrQjtRQUx0QixlQUFVLEdBQVksRUFBRSxDQUFDO1FBQ3pCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFJdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUNsQyxJQUFJLEVBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQzFDLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTyxjQUFjLENBQUMsU0FBa0I7UUFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUFXO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVPLGVBQWUsQ0FBQyxHQUFXLEVBQUUsU0FBa0I7UUFDbkQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FDbkIsMEJBQTBCLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ2pFLENBQUM7U0FDTDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQXFCLEVBQUUsSUFBVyxFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQVcsU0FBUztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVNLFdBQVcsQ0FBQyxFQUFVO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDaEU7UUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVNLElBQUk7UUFDUCxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDN0MsT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDL0MsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFoRkQsNEJBZ0ZDIn0=