type Optional<T> = T | undefined;

type VoidFunc = () => void;

type SpreadFunc = (...args: Array<any>) => void;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
