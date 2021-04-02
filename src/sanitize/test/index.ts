import test from "ava";
import { sanitize } from "../index";

test(`sanitize`, (t) => {
  const num = Math.random();
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  const str =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const replacements = {
    [num]: "NUM",
    [str]: "STRING",
  };
  const data = {
    b: true,
    m: 123,
    n: num,
    nul: null,
    r: "some constant string",
    s: str,
    sub1: {
      n1: num,
      s1: `${str}someother`,
    },
    sub2: [
      {
        n2: num,
      },
      {
        s2: str,
      },
    ],
  };

  t.snapshot(sanitize(data, replacements));
});
