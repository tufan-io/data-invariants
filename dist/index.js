"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const json5 = require("json5");
const index_1 = require("./filter/index");
__export(require("./sanitize"));
function dataInvariants(data, filters) {
    // a simple filters to eliminate non-json fields from data.
    // this is especially ueful whendata is a js object literal
    data = json5.parse(json5.stringify(data));
    return index_1.filter(data, filters);
}
exports.dataInvariants = dataInvariants;
//# sourceMappingURL=index.js.map