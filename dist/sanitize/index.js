"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
const json5 = require("json5");
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
function sanitize(data, rmap) {
    // a simple filters to eliminate non-json fields from data.
    // this is especially ueful whendata is a js object literal
    data = json5.parse(json5.stringify(data));
    return _sanitize(data, rmap);
}
exports.sanitize = sanitize;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _sanitize(data, rmap) {
    const type = Object.prototype.toString.call(data);
    switch (type) {
        case "[object Object]":
            return Object.keys(data).reduce((result, key) => {
                result[key] = _sanitize(data[key], rmap);
                return result;
            }, {});
        case "[object Array]":
            return data.map((el) => _sanitize(el, rmap));
        case "[object String]":
            return Object.keys(rmap).reduce((_data, candidate) => _data.replace(candidate, rmap[candidate]), data);
        case "[object Number]":
            return Object.keys(rmap).reduce((_data, candidate) => {
                const _candidate = Number(candidate);
                return !isNaN(_candidate) && _candidate === _data
                    ? rmap[candidate]
                    : _data;
            }, data);
        case "[object Boolean]":
        case "[object Null]":
            return data;
    }
}
//# sourceMappingURL=index.js.map