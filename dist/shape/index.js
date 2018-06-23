"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shape(data) {
    const type = Object.prototype.toString.call(data);
    switch (type) {
        case '[object Object]': {
            return Object.keys(data).reduce((acc, key) => {
                const val = data[key];
                acc[key] = shape(val);
                return acc;
            }, {});
        }
        case '[object Array]': {
            return data.map(el => shape(el));
        }
        case '[object String]':
            return 'string';
        case '[object Boolean]':
            return true;
        case '[object Number]':
            return 1;
        case '[object Null]':
            return null;
    }
}
exports.shape = shape;
