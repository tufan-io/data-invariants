import { test } from 'ava';
import { shape } from '..';

test(`simple object`, t => {
  const data = {
    a: 'some string',
    b: 3.14,
    c: true,
    d: null
  };
  t.snapshot(data)
  t.snapshot(shape(data))
})

test(`simple array`, t => {
  const data = [
    'some string',
    3.14,
    true,
    null
  ]
  t.snapshot(data)
  t.snapshot(shape(data))
})

test(`nested object`, t => {
  const data = {
    a: 'some string',
    b: 3.14,
    c: true,
    d: null,
    e: [1, 2, 3],
    f: {
      a: 'some string',
      b: 3.14,
      c: true,
      d: null,
      e: [1, 2, 3]
    }
  }
  t.snapshot(data)
  t.snapshot(shape(data))

})

test(`nested array`, t => {
  const data = [{
    a: 'some string',
    b: 3.14,
    c: true,
    d: false,
    e: {
      a: 's2',
      b: 1.23
    }
  }, {
    a: 'another string',
    b: 2,
    c: true,
    e: {
      a: 's3',
      b: 13
    }
  }]
  t.snapshot(data)
  t.snapshot(shape(data))
})
