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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW51bS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1ZG9rdS9FbnVtLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBK0I7QUFDL0IsOENBQXVCO0FBRXZCLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDbkUsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzFFLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUM1RSxNQUFNLG1CQUFtQixHQUFHO0lBQ3hCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQzFFLENBQUM7QUFFRixhQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxLQUFLLE1BQU0sUUFBUSxJQUFJLE1BQU0sRUFBRTtRQUMzQixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzlCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxjQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUMzQyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLGNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sUUFBUSxHQUFHLCtCQUErQixJQUFJLENBQUMsU0FBUyxDQUMxRCxnQkFBZ0IsQ0FDbkIsRUFBRSxDQUFDO0lBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDN0MsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxjQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN2RCxNQUFNLFFBQVEsR0FBRyxpQ0FBaUMsSUFBSSxDQUFDLFNBQVMsQ0FDNUQsa0JBQWtCLENBQ3JCLEVBQUUsQ0FBQztJQUNKLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNyRCxNQUFNLFFBQVEsR0FBRztRQUNiLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtRQUMzQixHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7S0FDOUIsQ0FBQztJQUNGLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHdEQUF3RCxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsWUFBWSxDQUFDO0lBQy9ELE1BQU0sUUFBUSxHQUFHO1FBQ2IsR0FBRyxFQUFFO1lBQ0QsRUFBRSxFQUFFLENBQUM7WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtTQUNsRDtLQUNKLENBQUM7SUFDRixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyw4Q0FBOEMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNyRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsK0NBQStDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2hELE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsYUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNsRCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDM0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMscURBQXFELEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDNUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDNUQsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUM7SUFDckMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsOENBQThDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDckQsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUM3QyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLGNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsTUFBTSxRQUFRLEdBQUcsK0JBQStCLENBQUM7SUFDakQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMifQ==