import * as json5 from "json5";

interface IReplacements {
  [val: number]: number | string;
  [val: string]: number | string;
}

export function sanitize(data: any, rmap: IReplacements) {
  // a simple filters to eliminate non-json fields from data.
  // this is especially ueful whendata is a js object literal
  data = json5.parse(json5.stringify(data));
  return _sanitize(data, rmap);
}

export function _sanitize(data: any, rmap: IReplacements) {
  const type = Object.prototype.toString.call(data);
  switch (type) {
    case "[object Object]":
      return Object.keys(data).reduce((result, key) => {
        result[key] = _sanitize(data[key], rmap);
        return result;
      }, {} as object);
    case "[object Array]":
      return data.map((el) => _sanitize(el, rmap));
    case "[object String]":
      return Object.keys(rmap).reduce(
        (_data, candidate) => (_data as string).replace(candidate, rmap[candidate] as string),
        data);
    case "[object Number]":
      return Object.keys(rmap).reduce(
        (_data, candidate) => {
          const _candidate = Number(candidate);
          return (!isNaN(_candidate) && _candidate === _data)
            ? rmap[candidate]
            : _data;
        },

        data);
    case "[object Boolean]":
    case "[object Null]":
      return data;
  }
}
