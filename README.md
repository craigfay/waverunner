# Testing should be easy! 💆‍♂️

Let's get a Javascript test suite running in 30 seconds.
Here's what test results will look like in our console:

```
multipleTermsTest: 0.79 ms ok
decimalTermsTest: 0.04 ms ok
negativeTermsTest: 0.03 ms ok
nonNumericTermsTest: 0.21 ms ok
testSuite: 3.19 ms ok
```

## Step 1:
Create a module that you'd like to conduct tests on.
We'll use an addition module that adds numbers together, and name it `addition.js`.

```javascript
// addition.js
module.exports.addition = function addition(...terms) {
  return terms.reduce((total, term) => {
    if (typeof term !== 'number') throw new Error('Unsupported non-numeric addition')
    return term += total
  })
}
```

## Step 2:
Introduce a test module that imports `addition.js`, called `addition.test.js`.
Writing tests is extremely simple, because there's only two rules to follow:
* A "test" is any function, that will throw an `Error` object to indicate failure. 
* All test modules, like `addition.test.js` must export an Array of test functions,
named `tests`. Easy right?


```javascript
// addition.test.js
const { addition } = require('./addition')
const { strict: assert } = require('assert')

function multipleTermsTest() {
  if (addition(5, 5, 5) !== 15)
  throw new Error('Addition with multiple terms must work')
}

function decimalTermsTest() {
  if (addition(5, 1.25) !== 6.25)
  throw new Error('Addition with decimal numbers must work')
}

function negativeTermsTest() {
  if (addition(5, (-5)) !== 0)
  throw new Error('Addition with negative numbers must work')
}

function nonNumericTermsTest() {
  assert.throws(() => addition(5, '5'))
}

module.exports.tests = [
  multipleTermsTest,
  decimalTermsTest,
  negativeTermsTest,
  nonNumericTermsTest,
]
```

## Step 3:
Add `test.js`, which will be an entrypoint for the entire test suite. Use `node test.js` to kick things off.

```javascript
// test.js
const { run, testSuite } = require('tinyrunner');

run(testSuite(
  require('./addition.test')
));
```

## Why Tinyrunner?
* All tests run top-to-bottom in the order they're included.
* Nothing runs without your explicit say so.
* No extra abstraction layers to learn. Just throw an Error.