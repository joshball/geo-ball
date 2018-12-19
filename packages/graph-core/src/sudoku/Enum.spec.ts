import Enumitron from './Enum';
import test from 'ava';

const enumArray = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
const duplicateIdArray = [{ id: 1, name: 'One' }, { id: 1, name: 'Two' }];
const duplicateNameArray = [{ id: 1, name: 'One' }, { id: 2, name: 'One' }];
const extraKeyValuesArray = [
    { id: 1, name: 'One', translations: { spanish: 'Uno', german: 'Ein' } }
];

test('is iterable with for loop', t => {
    const actual = new Enumitron(enumArray);
    for (let i = 0; i < actual.length; i++) {
        t.deepEqual(actual[i], enumArray[i]);
    }
});

test('is iterable with for of loop', t => {
    const actual = new Enumitron(enumArray);
    let index = 0;
    for (const expected of actual) {
        t.deepEqual(actual[index++], expected);
    }
});

test('can access items at index', t => {
    const actual = new Enumitron(enumArray)[1];
    const expected = enumArray[1];
    t.deepEqual(actual, expected);
});

test('does not throw errors', t => {
    t.notThrows(() => new Enumitron(enumArray));
});

test('throws error when id is not unique', t => {
    const actual = () => new Enumitron(duplicateIdArray);
    const expected = `Enums must have unique ids. ${JSON.stringify(
        duplicateIdArray
    )}`;
    t.throws(actual, expected);
});

test('throws error when name is not unique', t => {
    const actual = () => new Enumitron(duplicateNameArray);
    const expected = `Enums must have unique names. ${JSON.stringify(
        duplicateNameArray
    )}`;
    t.throws(actual, expected);
});

test('returns the enum as a dictionary', t => {
    const actual = new Enumitron(enumArray).asDictionary;
    const expected = {
        One: { id: 1, name: 'One' },
        Two: { id: 2, name: 'Two' }
    };
    t.deepEqual(actual, expected);
});

test('returns dictionary with extra key/value pair preserved', t => {
    const actual = new Enumitron(extraKeyValuesArray).asDictionary;
    const expected = {
        One: {
            id: 1,
            name: 'One',
            translations: { spanish: 'Uno', german: 'Ein' }
        }
    };
    t.deepEqual(actual, expected);
});

test('returns the enum ids as an array of integers', t => {
    const actual = new Enumitron(enumArray).asIds;
    const expected = [1, 2];
    t.deepEqual(actual, expected);
});

test('returns the enum names as an array of strings', t => {
    const actual = new Enumitron(enumArray).asNames;
    const expected = ['One', 'Two'];
    t.deepEqual(actual, expected);
});
test('returns the enum in its original form', t => {
    const actual = new Enumitron(enumArray).asObjects;
    const expected = enumArray;
    t.deepEqual(actual, expected);
});

test('returns objects with extra key/value pair preserved', t => {
    const actual = new Enumitron(extraKeyValuesArray).asObjects;
    const expected = extraKeyValuesArray;
    t.deepEqual(actual, expected);
});

test('returns the correct name when match is found', t => {
    const actual = new Enumitron(enumArray).getNameById(1);
    const expected = 'One';
    t.deepEqual(actual, expected);
});

test('throws error when match is not found', t => {
    const actual = () => new Enumitron(enumArray).getNameById(3);
    const expected = 'Enum with id 3 does not exist';
    t.throws(actual, expected);
});
