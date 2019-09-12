const { run, testSuite } = require('../main')

run(testSuite(
  require('./addition.test')
))
