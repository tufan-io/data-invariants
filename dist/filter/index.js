"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match = require("micromatch");
function filter(data, globPatterns) {
    const _filter = (data, globPatterns, path = '') => {
        if (match(path, globPatterns).length === 0) {
            return undefined;
        }
        const type = Object.prototype.toString.call(data);
        switch (type) {
            case '[object Object]': {
                return Object.keys(data).reduce((acc, key) => {
                    const filtered = _filter(data[key], globPatterns, `${path}/${key}`);
                    if (filtered !== undefined) {
                        acc[key] = filtered;
                    }
                    return acc;
                }, {});
            }
            case '[object Array]': {
                return data.reduce((acc, el, idx) => {
                    const filtered = _filter(el, globPatterns, `${path}/${idx}`);
                    if (filtered !== undefined) {
                        acc.push(filtered);
                    }
                    return acc;
                }, []);
            }
            case '[object String]':
            case '[object Boolean]':
            case '[object Number]':
            case '[object Null]':
                return data;
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
    const allNegations = patterns.reduce((acc, el) => acc && el[0] === '!', true);
    return allNegations ? ['**'].concat(patterns) : patterns;
}
