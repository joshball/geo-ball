export const UnicornColors = ['Blue', 'Red', 'Green', 'Purple'] as const;
export type UnicornColor = typeof UnicornColors[number];

export interface IOverpassQueryFileContents {
    name: string;
    age: number;
    color: UnicornColor;
}

export class OverpassQueryFileContents implements IOverpassQueryFileContents {
    name: string;
    age: number;
    color: UnicornColor;

    constructor(name: string, age: number, color: UnicornColor) {
        this.name = name;
        this.age = age;
        this.color = color;
    }

    static CreateDefault() {
        return new OverpassQueryFileContents('No name', 1, 'Purple');
    }
}
