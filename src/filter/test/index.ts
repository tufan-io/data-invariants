import test from "ava";
import { filter } from "..";

test(`exclusion patterns`, (t) => {
  const data = {
    deep: {
      active: true,
      children: [{
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
        name: "john",
      }, {
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
        name: "alice",
      }],
      id: 1,
    },
    key: `Invariant Key`,
    signature: Math.random(),
    timestamp: Date.now(),
  };
  const variantFilters = [
    `!**/timestamp`,
    `!**/signature`,
    `!**/lastActive`,
  ];
  t.snapshot(filter(data, variantFilters));
});

test(`exclusion and inclusion patterns`, (t) => {
  const data = {
    deep: {
      active: true,
      children: [{
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
        name: "john",
      }, {
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
        name: "alice",
      }],
      id: 1,
    },
    key: `Invariant Key`,
    signature: Math.random(),
    timestamp: Date.now(),
  };
  const variantFilters = [
    `**`,
    `!**/timestamp`,
    `!**/signature`,
    `!**/lastActive`,
  ];
  t.snapshot(filter(data, variantFilters));
});

test(`array exclusion`, (t) => {
  const data = {
    deep: {
      active: true,
      children: ["john", "alice"],
      id: 1,
    },
    key: `Invariant Key`,
    signature: Math.random(),
    timestamp: Date.now(),
  };
  const variantFilters = [
    `**`,
    `!**/0`,
    `!**/timestamp`,
    `!**/signature`,
    `!**/lastActive`,
  ];
  t.snapshot(filter(data, variantFilters));
});

test(`unsupported type`, (t) => {
  const data = {
    deep: {
      active: true,
      children: [{
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
        name: `john`,
      }, {
        lastActive: Date.now() - Math.random() * 24 * 3600 * 100,
        name: `alice`,
      }],
      fun: () => { }, // tslint:disable-line:no-empty
      id: 1,
    },
    key: `Invariant Key`,
    signature: Math.random(),
    timestamp: Date.now(),
  };
  const variantFilters = [
    `!**/timestamp`,
    `!**/signature`,
    `!**/lastActive`,
  ];
  t.throws(
    () => filter(data, variantFilters),
    "unsupported data type Function at /deep/fun");
});
