"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerializedKeyMap {
    constructor(serializer, deserializer, serializedMapJson) {
        this._map = new Map(serializedMapJson);
        this._serializer = serializer;
        this._deserializer = deserializer;
    }
    get size() {
        return this._map.size;
    }
    get(key) {
        const serializedKey = this._serializer(key);
        return this._map.get(serializedKey);
    }
    serialize(pretty = false) {
        return pretty ? JSON.stringify([...this._map], undefined, 4) : JSON.stringify([...this._map]);
    }
    entries() {
        const deserializer = this._deserializer;
        const v = Array.from(this._map.entries());
        const a = [];
        v.forEach(item => a.push([deserializer(item[0]), item[1]]));
        return a;
    }
    set(key, value) {
        const serializer = this._serializer;
        return this._map.set(serializer(key), value);
    }
}
exports.SerializedKeyMap = SerializedKeyMap;
class SerializedSet {
    constructor(serializer, deserializer) {
        this.size = this._set ? this._set.size : 0;
        this._set = new Set();
        this._serializer = serializer;
        this._deserializer = deserializer;
    }
    add(value) {
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
    entries() { return this.values(); }
    values() {
        const deserializer = this._deserializer;
        const v = Array.from(this._set.values());
        const a = [];
        v.forEach(item => a.push(deserializer(item)));
        return a;
    }
    has(value) {
        return this._set.has(this._serializer(value));
    }
}
exports.SerializedSet = SerializedSet;
//# sourceMappingURL=SerializedKeyMap.js.map