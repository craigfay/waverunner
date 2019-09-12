const { strict: assert } = require('assert')

function addition(...terms) {
  return terms.reduce((total, term) => {
    if (typeof term !== 'number') throw new Error('Unsupported non-numeric addition')
    return term += total
  })
}

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
