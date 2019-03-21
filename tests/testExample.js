// This is a Mocha test file. In general Mocha tests are grouped by test suites
// which are defined in describe() blocks. You can nest describe() calls inside
// each other. In the describe() call, you give it a name for the test suite
// and then a function to run when we want to run this test suite. The function
// contains it() blocks which define individual tests to be run. it() calls get
// a name for the test and a function to run. The function takes an argument:
// -done- which is a function. When you call done(), the test is considered
// complete. If you omit the -done- argument, the test will be considered
// complete when the function exits. Chai is an assertion library that provides
// many different easy-to-use assertion functions to quickly define tests.
// You can run these tests by going to your console and running the command:
//
// npm run test
//    --or--
// mocha ./tests
//
// Plenty more documentation is available if you google Mocha.js or Chai.js.
// ============================================================================

const expect = require('chai').expect;

describe('Example Module', function () {
  it('should do a thing, probably', function (done) {
    const lookAVariableHowCool = null;

    // Really english-like expect-style assertions with Chai
    expect(lookAVariableHowCool).to.be.null;
    expect(lookAVariableHowCool).to.equal(null);
    expect(lookAVariableHowCool).to.deep.equal(null);

    done();
  });
});