'use strict';

var assign = Object.assign || require('object.assign');

module.exports = function toArraySubClassFactory(ArraySubClass) {
  ArraySubClass.prototype = assign(Object.create(Array.prototype),  ArraySubClass.prototype);

  return function () {
    var arr = [ ];
    arr.__proto__ = ArraySubClass.prototype; // jshint ignore:line

    ArraySubClass.apply(arr, arguments);

    return arr;
  };
};

