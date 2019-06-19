type Optional<T> = T | undefined;

type VoidFunc = () => void;

type SpreadFunc = (...args: Array<any>) => void;

declare module '*.json';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
