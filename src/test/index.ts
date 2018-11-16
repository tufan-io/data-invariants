import { test } from "ava";
import { dataInvariants } from "..";

const JSON2 = (j) => JSON.stringify(j, null, 2);

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
    key: "Invariant Key",
    signature: Math.random(),
    timestamp: Date.now(),
  };
  const variantFilters = [
    "!**/timestamp",
    "!**/signature",
    "!**/lastActive",
  ];
  const { invariant, shape } = dataInvariants(data, variantFilters);
  try {
    t.snapshot(invariant, "invariant");
    t.snapshot(shape, "shape");
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(JSON2({ data, variantFilters }));
    throw err;
  }
});
