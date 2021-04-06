import { JsPrimitive } from "../definitions";
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
export declare function filter(data: JsPrimitive, globPatterns: string[]): JsPrimitive;
