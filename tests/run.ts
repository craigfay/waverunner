import { run, testSuite } from './main'

run(testSuite(
  require('./example.test')
))