#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> JavaScript array inheritance done right.

## Install

```sh
$ npm install --save inherit-array
```


## Usage

```js
var inheritArray = require('inherit-array');

function SubArray(x) {
  this.x = x;
}

SubArray.prototype.last = function () {
  return this[this.length - 1];
};

var subArrayFactory = inheritArray(SubArray);

var subArray = subArrayFactory(3);

assert.strictEqual(subArray.x, 3);

subArray.push(2);

assert.strictEqual(subArray.length, 1);
assert.strictEqual(subArray[0], 2);
assert.strictEqual(subArray.last(), 2);

subArray.length = 3;

assert.strictEqual(subArray.join(), '2,,');

subArray.length = 0;

assert.strictEqual(JSON.stringify(subArray), '[]');

assert(Array.isArray(subArray));
assert(subArray instanceof Array);

```

```sh
# creates a browser.js
$ npm run browser
```


## License

MIT © [Amit Portnoy](https://github.com/amitport)

[npm-image]: https://badge.fury.io/js/inherit-array.svg
[npm-url]: https://npmjs.org/package/inherit-array
[travis-image]: https://travis-ci.org/amitport/inherit-array.svg?branch=master
[travis-url]: https://travis-ci.org/amitport/inherit-array
[daviddm-image]: https://david-dm.org/amitport/inherit-array.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/amitport/inherit-array
