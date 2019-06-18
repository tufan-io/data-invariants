"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match = require("micromatch");
function filter(data, globPatterns) {
    const _filter = (_data, globs, path = "") => {
        const type = Object.prototype.toString.call(_data);
        if (path && 0 === match(path, globs).length) {
            return `[VARIANT_DATA: ${type.replace(/\[object /, "")}`;
        }
        switch (type) {
            case "[object Object]": {
                return Object.keys(_data).reduce((acc, key) => {
                    const filtered = _filter(_data[key], globs, `${path}/${key}`);
                    acc[key] = filtered;
                    return acc;
                }, {});
            }
            case "[object Array]": {
                return (_data).reduce((acc, el, idx) => {
                    const filtered = _filter(el, globs, `${path}/${idx}`);
                    acc.push(filtered);
                    return acc;
                }, []);
            }
            case "[object String]":
            case "[object Boolean]":
            case "[object Number]":
            case "[object Null]":
                return _data;
            default: {
                const _type = type.match(/\[object (.*)\]/)[1];
                throw new Error(`unsupported data type ${_type} at ${path}`);
            }
        }
    };
    return _filter(data, normalizeGlobs(globPatterns));
}
exports.filter = filter;
function normalizeGlobs(patterns) {
    const allNegations = patterns.reduce((acc, el) => acc && el[0] === "!", true);
    return allNegations ? ["**"].concat(patterns) : patterns;
}
//# sourceMappingURL=index.js.map