import { test } from 'ava';
import { dataInvariants } from '..';

const JSON2 = j => JSON.stringify(j, null, 2);

test(`exclusion patterns`, t => {
  const data = {
    timestamp: Date.now(),
    signature: Math.random(),
    key: 'Invariant Key',
    deep: {
      id: 1,
      active: true,
      children: [{
        name: 'john',
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100
      }, {
        name: 'alice',
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100
      }]
    }
  }
  const variantFilters = [
    '!**/timestamp',
    '!**/signature',
    '!**/lastActive'
  ];
  const { invariant, shape } = dataInvariants(data, variantFilters);
  try {
    t.snapshot(invariant, 'invariant');
    t.snapshot(shape, 'shape');
  } catch (err) {
    console.error(JSON2({ data, variantFilters }));
    throw err;
  }
})
