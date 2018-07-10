
import { filter } from './filter/index';
import { shape as _shape } from './shape/index';

export function dataInvariants(data: any, filters: string[]) {
  // a simple filters to eliminate non-json fields from data.
  // this is especially ueful whendata is a js object literal
  data = JSON.parse(JSON.stringify(data));
  const invariant = filter(data, filters);
  const shape = _shape(data);
  return { invariant, shape};
}
