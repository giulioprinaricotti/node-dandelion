[![Build Status](https://travis-ci.org/giulioprinaricotti/node-dandelion.svg?branch=master)](https://travis-ci.org/giulioprinaricotti/node-dandelion)

[![Coverage Status](https://coveralls.io/repos/github/giulioprinaricotti/node-dandelion/badge.svg?branch=master)](https://coveralls.io/github/giulioprinaricotti/node-dandelion?branch=master)

#A nodejs client for the Dandelion API.
=========

A small library that adds commas to numbers

## Installation

  `npm install @gprinaricotti/node-dandelion`

## Usage

```javascript
var API = require('node-dandelion');

var Dandelion = new API.Dandelion()

Dandelion.setToken('xxxxxxx');

Dandelion.getEntities({'text': 'The brown fox and the doctor'})
.then(function(data){
	console.log(data.body);
})
.catch(function(err){
	console.log(err);
});
```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.