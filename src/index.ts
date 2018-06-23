
import { filter } from './filter/index';
import { shape as _shape } from './shape/index';

export function dataInvariants(data: any, filters: string[]) {
  const invariant = filter(data, filters);
  const shape = _shape(data);
  return { invariant, shape};
}
