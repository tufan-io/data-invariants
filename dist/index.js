"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json5 = require("json5");
const index_1 = require("./filter/index");
function dataInvariants(data, filters) {
    data = json5.parse(json5.stringify(data));
    return index_1.filter(data, filters);
}
exports.dataInvariants = dataInvariants;
