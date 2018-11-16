
import * as match from "micromatch";

/**
 * Given a JSON object and a set of JSON-path like glob patterns,
 * returns a filtered version of the object.
 *
 *   const data = {
 *     a: {
 *      b: {
 *        c: 1,
 *        d: 2
 *      }
 *    },
 *    e: {
 *      f: {
 *        g: 3,
 *        h: 4
 *      }
 *    }
 *  }
 *  console.log(dataFilters(data, ['!a.*'])
 *
 * It uses `minimatch` under the covers to achieve the matching.
 * Hence the JSON-path like glob strings
 *
 * and
 * It uses `minimatch under the covers to accomplish the needful
 * Given a JSON object, returns it's shape. It converts all values
 * to simple consistent values.
 *   'string',
 *   1
 *   true
 *   null
 *
 *  Objects and Arrays are traversed recursively to apply this rule.
 *
 *  This is useful to test expected shape of data when their values are
 *  kown to vary with time.
 *
 * @export
 * @param {*} data
 * @param {string[]} globPatterns
 * @returns
 */
export function filter(data: any, globPatterns: string[]) {
  const _filter = (
    _data: any,
    globs: string[],
    path: string = "",
  ) => {
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
        }, {} as object);
      }
      case "[object Array]": {
        return (_data).reduce((acc, el, idx) => {
          const filtered = _filter(el, globs, `${path}/${idx}`);
          if (filtered !== undefined) {
            acc.push(filtered);
          }
          return acc;
        }, [] as any[]);
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

/**
 * micromatch fails non-intuitively, when all the patterns to match
 * are negations and not match. A work-around is to add `**` as a pattern,
 * when there are only negations.
 *
 * @param {string[]} patterns
 */
function normalizeGlobs(patterns: string[]) {
  const allNegations = patterns.reduce((acc, el) => acc && el[0] === "!", true);
  return allNegations ? ["**"].concat(patterns) : patterns;
}
