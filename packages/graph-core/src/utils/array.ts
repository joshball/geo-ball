import { realpathSync } from 'fs';

export const flatten = (array: Array<any>): Array<any> => {
    return array.reduce(
        (prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr),
        [],
    );
};

export const flattenOneLevel = (array: Array<any>): Array<any> => {
    return array.reduce((prev, curr) => prev.concat(curr), []);
};
