declare type SerializedKeyFunc<TObjKey> = (obj: TObjKey) => string;
declare type DeserializeKeyFunc<TObjKey> = (s: string) => TObjKey;
export declare class SerializedKeyMap<TObjKey, TValue> {
    private _map;
    private _serializer;
    private _deserializer;
    constructor(serializer: SerializedKeyFunc<TObjKey>, deserializer: DeserializeKeyFunc<TObjKey>, serializedMapJson?: any | undefined);
    readonly size: number;
    get(key: TObjKey): TValue | undefined;
    serialize(pretty?: boolean): string;
    entries(): [TObjKey, TValue][];
    set(key: TObjKey, value: TValue): Map<string, TValue>;
}
export declare class SerializedSet<TValue> {
    private _set;
    private _serializer;
    _deserializer: DeserializeKeyFunc<TValue>;
    constructor(serializer: SerializedKeyFunc<TValue>, deserializer: DeserializeKeyFunc<TValue>);
    readonly size: number;
    add(value: TValue): Set<string>;
    entries(): Array<TValue>;
    values(): Array<TValue>;
    has(value: TValue): boolean;
}
export {};
//# sourceMappingURL=SerializedKeyMap.d.ts.map