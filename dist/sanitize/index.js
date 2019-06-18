"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json5 = require("json5");
function sanitize(data, rmap) {
    data = json5.parse(json5.stringify(data));
    return _sanitize(data, rmap);
}
exports.sanitize = sanitize;
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
                return (!isNaN(_candidate) && _candidate === _data)
                    ? rmap[candidate]
                    : _data;
            }, data);
        case "[object Boolean]":
        case "[object Null]":
            return data;
    }
}
exports._sanitize = _sanitize;
//# sourceMappingURL=index.js.map