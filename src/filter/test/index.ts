import { test } from 'ava';
import { filter } from '..';

// const JSON2 = j => JSON.stringify(j, null, 2);

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
  t.snapshot(filter(data, variantFilters));
  // t.

  // console.log(JSON2({ data, variantFilters, invariant, shape }));
  // try {
  //   t.snapshot(invariant, 'invariant');
  //   t.snapshot(shape, 'shape');
  // } catch (err) {
  //   console.error(JSON2({ data, variantFilters }));
  //   throw err;
  // }
})

test(`exclusion and inclusion patterns`, t => {
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
    '**',
    '!**/timestamp',
    '!**/signature',
    '!**/lastActive'
  ];
  t.snapshot(filter(data, variantFilters));
})

test(`array exclusion`, t => {
  const data = {
    timestamp: Date.now(),
    signature: Math.random(),
    key: 'Invariant Key',
    deep: {
      id: 1,
      active: true,
      children: [ 'john', 'alice']
    }
  }
  const variantFilters = [
    '**',
    '!**/0',
    '!**/timestamp',
    '!**/signature',
    '!**/lastActive'
  ];
  t.snapshot(filter(data, variantFilters));
})

test(`unsupported type`, t => {
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
      }],
      fun: () => { }
    }
  }
  const variantFilters = [
    '!**/timestamp',
    '!**/signature',
    '!**/lastActive'
  ];
  t.throws(
    () => filter(data, variantFilters),
    'unsupported data type Function at /deep/fun');
})
