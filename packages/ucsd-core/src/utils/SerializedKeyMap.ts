type SerializedKeyFunc<TObjKey> = (obj: TObjKey) => string;
type DeserializeKeyFunc<TObjKey> = (s: string) => TObjKey;

export class SerializedKeyMap<TObjKey, TValue> {
    private _map: Map<string, TValue>;
    private _serializer: SerializedKeyFunc<TObjKey>;
    private _deserializer: DeserializeKeyFunc<TObjKey>;

    constructor(
        serializer: SerializedKeyFunc<TObjKey>,
        deserializer: DeserializeKeyFunc<TObjKey>,
        serializedMapJson?: any | undefined,
    ) {
        this._map = new Map<string, TValue>(serializedMapJson);
        this._serializer = serializer;
        this._deserializer = deserializer;
    }

    get size(): number {
        return this._map.size;
    }

    public get(key: TObjKey) {
        const serializedKey = this._serializer(key);
        return this._map.get(serializedKey);
    }

    public serialize(pretty: boolean = false): string {
        return pretty
            ? JSON.stringify([...this._map], undefined, 4)
            : JSON.stringify([...this._map]);
    }

    public entries(): [TObjKey, TValue][] {
        const deserializer = this._deserializer;
        const v = Array.from(this._map.entries());
        const a: [TObjKey, TValue][] = [];
        v.forEach(item => a.push([deserializer(item[0]) as TObjKey, item[1] as TValue]));
        return a;
    }

    public set(key: TObjKey, value: TValue) {
        const serializer = this._serializer;
        return this._map.set(serializer(key), value);
    }
}

export class SerializedSet<TValue> {
    private _set: Set<string>;
    private _serializer: SerializedKeyFunc<TValue>;
    _deserializer: DeserializeKeyFunc<TValue>;

    constructor(serializer: SerializedKeyFunc<TValue>, deserializer: DeserializeKeyFunc<TValue>) {
        this._set = new Set<string>();
        this._serializer = serializer;
        this._deserializer = deserializer;
    }

    public readonly size: number = this._set ? this._set.size : 0;

    public add(value: TValue) {
        const serializedKey = this._serializer(value);
        return this._set.add(serializedKey);
    }

    // public entries(): [TObjKey, TValue][] {
    //     const deserializer = this._deserializer;
    //     const v = Array.from(this._set.entries())
    //     const a: [TObjKey, TValue][] = [];
    //     v.forEach(item => a.push([deserializer(item[0]) as TObjKey, item[1] as TValue]));
    //     return a;
    // }

    public entries(): Array<TValue> {
        return this.values();
    }

    public values(): Array<TValue> {
        const deserializer = this._deserializer;
        const v = Array.from(this._set.values());
        const a: Array<TValue> = [];
        v.forEach(item => a.push(deserializer(item) as TValue));
        return a;
    }

    public has(value: TValue): boolean {
        return this._set.has(this._serializer(value));
    }
}
