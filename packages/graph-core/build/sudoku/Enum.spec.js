"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = __importDefault(require("./Enum"));
const ava_1 = __importDefault(require("ava"));
const enumArray = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
const duplicateIdArray = [{ id: 1, name: 'One' }, { id: 1, name: 'Two' }];
const duplicateNameArray = [{ id: 1, name: 'One' }, { id: 2, name: 'One' }];
const extraKeyValuesArray = [
    { id: 1, name: 'One', translations: { spanish: 'Uno', german: 'Ein' } }
];
ava_1.default('is iterable with for loop', t => {
    const actual = new Enum_1.default(enumArray);
    for (let i = 0; i < actual.length; i++) {
        t.deepEqual(actual[i], enumArray[i]);
    }
});
ava_1.default('is iterable with for of loop', t => {
    const actual = new Enum_1.default(enumArray);
    let index = 0;
    for (const expected of actual) {
        t.deepEqual(actual[index++], expected);
    }
});
ava_1.default('can access items at index', t => {
    const actual = new Enum_1.default(enumArray)[1];
    const expected = enumArray[1];
    t.deepEqual(actual, expected);
});
ava_1.default('does not throw errors', t => {
    t.notThrows(() => new Enum_1.default(enumArray));
});
ava_1.default('throws error when id is not unique', t => {
    const actual = () => new Enum_1.default(duplicateIdArray);
    const expected = `Enums must have unique ids. ${JSON.stringify(duplicateIdArray)}`;
    t.throws(actual, expected);
});
ava_1.default('throws error when name is not unique', t => {
    const actual = () => new Enum_1.default(duplicateNameArray);
    const expected = `Enums must have unique names. ${JSON.stringify(duplicateNameArray)}`;
    t.throws(actual, expected);
});
ava_1.default('returns the enum as a dictionary', t => {
    const actual = new Enum_1.default(enumArray).asDictionary;
    const expected = {
        One: { id: 1, name: 'One' },
        Two: { id: 2, name: 'Two' }
    };
    t.deepEqual(actual, expected);
});
ava_1.default('returns dictionary with extra key/value pair preserved', t => {
    const actual = new Enum_1.default(extraKeyValuesArray).asDictionary;
    const expected = {
        One: {
            id: 1,
            name: 'One',
            translations: { spanish: 'Uno', german: 'Ein' }
        }
    };
    t.deepEqual(actual, expected);
});
ava_1.default('returns the enum ids as an array of integers', t => {
    const actual = new Enum_1.default(enumArray).asIds;
    const expected = [1, 2];
    t.deepEqual(actual, expected);
});
ava_1.default('returns the enum names as an array of strings', t => {
    const actual = new Enum_1.default(enumArray).asNames;
    const expected = ['One', 'Two'];
    t.deepEqual(actual, expected);
});
ava_1.default('returns the enum in its original form', t => {
    const actual = new Enum_1.default(enumArray).asObjects;
    const expected = enumArray;
    t.deepEqual(actual, expected);
});
ava_1.default('returns objects with extra key/value pair preserved', t => {
    const actual = new Enum_1.default(extraKeyValuesArray).asObjects;
    const expected = extraKeyValuesArray;
    t.deepEqual(actual, expected);
});
ava_1.default('returns the correct name when match is found', t => {
    const actual = new Enum_1.default(enumArray).getNameById(1);
    const expected = 'One';
    t.deepEqual(actual, expected);
});
ava_1.default('throws error when match is not found', t => {
    const actual = () => new Enum_1.default(enumArray).getNameById(3);
    const expected = 'Enum with id 3 does not exist';
    t.throws(actual, expected);
});
//# sourceMappingURL=Enum.spec.js.map