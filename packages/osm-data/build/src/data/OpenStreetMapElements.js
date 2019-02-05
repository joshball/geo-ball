"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OpenStreetMapElements {
    constructor(elements) {
        this.elements = elements;
    }
    getStats() {
        return {
            elementCount: this.elements.length
        };
    }
}
exports.OpenStreetMapElements = OpenStreetMapElements;
//# sourceMappingURL=OpenStreetMapElements.js.map