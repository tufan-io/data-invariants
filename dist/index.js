"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const json5 = require("json5");
const index_1 = require("./filter/index");
__export(require("./sanitize"));
function dataInvariants(data, filters) {
    data = json5.parse(json5.stringify(data));
    return index_1.filter(data, filters);
}
exports.dataInvariants = dataInvariants;
//# sourceMappingURL=index.js.map