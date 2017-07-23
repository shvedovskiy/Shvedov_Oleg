const assert = require('assert');

function normalizeFloatPart(number, floatSize) {
  if (number === 0) {
    return number;
  }

  let cof = number < 0 ? -1 : 1;
  let preparedNumber = cof * number;

  let intPart = Math.floor(preparedNumber);
  let floatPart = preparedNumber - intPart;

  if (floatPart) {
    if (floatSize == null) {
      floatSize = 2;
    }
    let tenPow = Math.pow(10, floatSize);
    let rounded = Math.round(floatPart * tenPow) / tenPow;

    return cof * (intPart + rounded);
  }

  return number;
}

describe('normalizeFloatPart', () => {
  it('base', () => {
    assert.strictEqual(normalizeFloatPart(.3 + .6), .9);
  });

  it('negative', () => {
    assert.strictEqual(normalizeFloatPart(-.3 + -.6), -.9);
  });

  it('zero', () => {
    assert.strictEqual(normalizeFloatPart(0), 1);
  });
});
