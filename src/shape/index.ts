

/**
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
 * @param {(Object | Array<any>)} data
 */
export function shape(data: any) {
  const type = Object.prototype.toString.call(data);
  switch (type) {
    case '[object Object]': {
      return Object.keys(data).reduce((acc, key) => {
        const val = data[key];
        acc[key] = shape(val);
        return acc;
      }, <object>{});
    }
    case '[object Array]': {
      return (<Array<any>>data).map(el => shape(el));
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
