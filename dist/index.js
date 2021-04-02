"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataInvariants = void 0;
const json5 = require("json5");
const index_1 = require("./filter/index");
__exportStar(require("./sanitize"), exports);
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function dataInvariants(data, filters) {
    // a simple filters to eliminate non-json fields from data.
    // this is especially ueful whendata is a js object literal
    data = json5.parse(json5.stringify(data));
    return index_1.filter(data, filters);
}
exports.dataInvariants = dataInvariants;
//# sourceMappingURL=index.js.map