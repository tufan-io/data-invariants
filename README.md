# data-invariants

A library to extract invariants over partially variable data

<!-- badge -->
[![npm license](https://img.shields.io/npm/l/data-invariants.svg)](https://www.npmjs.com/package/data-invariants)
[![travis status](https://img.shields.io/travis/sramam/data-invariants.svg)](https://travis-ci.org/sramam/data-invariants)
[![Build status](https://ci.appveyor.com/api/projects/status/90am2usst4qeutgi?svg=true)](https://ci.appveyor.com/project/sramam/data-invariants)
[![Coverage Status](https://coveralls.io/repos/github/sramam/data-invariants/badge.svg?branch=master)](https://coveralls.io/github/sramam/data-invariants?branch=master)
[![David](https://david-dm.org/sramam/data-invariants/status.svg)](https://david-dm.org/sramam/data-invariants)
[![David](https://david-dm.org/sramam/data-invariants/dev-status.svg)](https://david-dm.org/sramam/data-invariants?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![NPM](https://nodei.co/npm/data-invariants.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/data-invariants/)
<!-- endbadge -->

## Why?

Oftentimes, much of an applications functionality reduces to stiching together multiple API responses to achieve an objective. 

This is however both a blessing and a curse. A blessing since the application is smaller, simpler and easier to reason about, meaning more correct. A curse because the appication is at the mercy of remote API responses when it comes to guaranteeing correctness.

The complexity in ensuring program correctness is reduced to the need for a data contract with the external APIs. At a system design level, one can mandate version control, schema specification and the like. However, these are outside our application's control and we are the mercy of the external API author(s).

Being the OCD engineers we are, we WILL NOT relinquish control! But... we are also lazy. Just because we want control doesn't mean we want to work too hard for it!

If this sounds like you, Welcome. Glad to have found a kindred spirit!

The rest of this document describes a simple protocol that gets us most of desired control on time/instance variant data, by imposing a "good-enough-for-most-practical-use" data contract over it.

## Design

### The Problem

- We have a large blob of data, controlled by an external entity.
- _Some_ fields in the data, vary based on externalities - time, credentials, signatures, network latencies etc., completely outside our control.
- We want to use that data but want predictability over it's shape and structure as time and the software-lifecycle passes.
- Any change is typically complicated and requires manual intervention to fix code.
- We want to minimize the work involved in change detection, focussing our efforts on corrective action.

### The Solution

The solution turns out to being rather simple - find invariants of the data that we can make assertions about.

The first insight is to split the data up into two parts - `{variant, invariant}`, or more precisely, extract the `invariant` part of the data.

A second insight is that the `data-shape` is constant, irrespective of the actual variant data. Meaning asserting on the `data-shape` will yield most of the benefit with none of the pain.

This library provides just that functionality:

```TypeScript
  const { invariant, shape } = dataInvariants(data, variantFilters);
```

Most modern testing tools provide some form of snapshot capability.
We achieve almost all of the required data-contract with a simple snapshot.

```TypeScript
  t.snapshot({invariant, shape});
```

## Usage

`npm install data-invariants`

```TypeScript
 import { dataInvariants } from 'data-invariants';

 // Given some data, and variantFilters, compute the invariants
 const { invariants, shape } = dataInvariants(data, variantFilters);

 // Inside a test case, snapshot the invariants for posterity.
 // We now have active monitoring of remote API responses!
 t.snapshot({ invariants, shape});
```

## Example

> I don't always provide examples, but when I do, they have to be working examples!

[working example](./test/index.ts)

### Implementation details

Under the covers, `data-invariants` uses [`micromatch`](https://github.com/micromatch/micromatch) for it's filtering capabilities.

It also implements `data-shape`, a utility that recursively walks the data and reduces the values to one of `['string', 1, true, null]`. `data-shape` only supports (some - no integers) of the [basic JSON types](https://cswr.github.io/JsonSchema/spec/basic_types/), and throws on anything but `[string, number, boolean, null]`. The data itself can be an arbtrarily complex structure of objects/arrays.

`micromatch` was designed to match file paths, which means it uses '/' as the seperator - both in the input string(s) and glob-patterns. Since we have established our laziness at this point, we obviously require that you specify globPatterns in a form that `micromatch` likes. Please see [`micromatch`](https://github.com/micromatch/micromatch#matching-features) for details.

## Development Tooling

- [Development tooling](./docs/DevTools.md)
- [Changelog](./CHANGELOG.md)

## License

[Apache-2.0](./LICENSE.md)

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

## Support

Bugs, PRs, comments, suggestions welcomed!
