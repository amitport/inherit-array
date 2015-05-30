'use strict';
var assert = require('assert');
var inheritArray = require('../');

describe('inherit-array node module', function () {
  var SubArray;
  var subArrayFactory;

  before(function () {
    SubArray = function SubArray(x) {
      this.x = x;
    };

    SubArray.prototype.last = function () {
      return this[this.length - 1];
    };

    subArrayFactory = inheritArray(SubArray);
  });


  it('is an array', function () {
    var a = subArrayFactory(3);

    assert(Array.isArray(a));
    assert(a instanceof Array);
  });

  it('extends original functionality', function () {
    var a = subArrayFactory(3);

    assert(a.x === 3);
    a.push(2);
    a.push(1);

    assert.strictEqual(a.last(), 1);
  });

  it('changes according the \'length\'', function () {
    var a = subArrayFactory(3);

    a.push(2);
    a.push(1);

    assert.strictEqual(JSON.stringify(a), '[2,1]');
    a.length = 1;
    assert.strictEqual(JSON.stringify(a), '[2]');
    a.length = 3;
    assert.strictEqual(JSON.stringify(a), '[2,null,null]');
  });

  it('considered an array in regards to the \'apply\' method', function () {
    var a = subArrayFactory(3);

    a.push(2);
    a.push(1);

    (function () {
      assert.strictEqual(arguments.length, 2);
      assert.strictEqual(arguments[1], 1);
    }).apply(null, a);
  });

  it('considered an instance of SubArray', function () {
    var a = subArrayFactory(3);

    assert(a instanceof SubArray);
  });

  it('demo should work', function () {
    var subArray = subArrayFactory(3);

    /*****************/
    /* it's an Array */
    /*****************/

    assert(Array.isArray(subArray));
    assert(subArray instanceof Array);

    // it has Array methods
    subArray.push(2);

    // array accessor work
    assert.strictEqual(subArray[0], 2);

    // array length work
    assert.strictEqual(subArray.length, 1);
    subArray.length = 3;
    assert.strictEqual(subArray.join(), '2,,');
    subArray.length = 0;
    assert.strictEqual(JSON.stringify(subArray), '[]'); // BONUS: JSON.stringify works

    subArray[1] = 5;
    // Function.prototype.apply treats it as an array
    (function () {assert.strictEqual(arguments[1], 5);}).apply(null, subArray);

    /*******************/
    /* it's a SubArray */
    /*******************/

    assert(subArray instanceof SubArray);

    // it uses SubArray constructor
    assert.strictEqual(subArray.x, 3);
    // it has SubArray methods
    assert.strictEqual(subArray.last(), 5);
  });
});
