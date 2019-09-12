# Usage

### Step 1:
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

### Step 2:
Introduce another module that imports the first, called `addition.test.js`.
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

### Step 3:
Add a single entrypoint module that will execute all the tests you include.
We like this, because tests run top-to-bottom in the order they're included,and nothing runs without your explicit say so.
Use `node test.js` to kick things off.

```javascript
// test.js
const { run, testSuite } = require('tinyrunner');

run(testSuite(
  require('./addition.test')
));
```
