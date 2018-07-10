"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./filter/index");
const index_2 = require("./shape/index");
function dataInvariants(data, filters) {
    data = JSON.parse(JSON.stringify(data));
    const invariant = index_1.filter(data, filters);
    const shape = index_2.shape(data);
    return { invariant, shape };
}
exports.dataInvariants = dataInvariants;
