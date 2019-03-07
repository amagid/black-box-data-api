const expect = require('chai').expect;

describe('Example Module', function () {
  it('should do a thing, probably', function () {
    const lookAVariableHowCool = null;

    // Really english-like expect-style assertions with Chai
    expect(lookAVariableHowCool).to.be.null;
    expect(lookAVariableHowCool).to.equal(null);
    expect(lookAVariableHowCool).to.deep.equal(null);
  });
});