"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match = require("micromatch");
function filter(data, globPatterns) {
    const _filter = (_data, globs, path = "") => {
        if (match(path, globs).length === 0) {
            return undefined;
        }
        const type = Object.prototype.toString.call(_data);
        switch (type) {
            case "[object Object]": {
                return Object.keys(_data).reduce((acc, key) => {
                    const filtered = _filter(_data[key], globs, `${path}/${key}`);
                    if (filtered !== undefined) {
                        acc[key] = filtered;
                    }
                    return acc;
                }, {});
            }
            case "[object Array]": {
                return (_data).reduce((acc, el, idx) => {
                    const filtered = _filter(el, globs, `${path}/${idx}`);
                    if (filtered !== undefined) {
                        acc.push(filtered);
                    }
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
