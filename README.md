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

Here's a list of possible tasks that you might find interesting!

 - Add more endpoints. See the [official documentation](https://dandelion.eu/docs/api) for inspiration
 - Add the option to specify input language rather than rely on automatic detection
 - Entity Extraction: allow to set additional options as per API documentation
