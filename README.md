[![Build Status](https://travis-ci.org/giulioprinaricotti/node-dandelion.svg?branch=master)](https://travis-ci.org/giulioprinaricotti/node-dandelion)

[![Coverage Status](https://coveralls.io/repos/github/giulioprinaricotti/node-dandelion/badge.svg?branch=master)](https://coveralls.io/github/giulioprinaricotti/node-dandelion?branch=master)

#A nodejs client for the Dandelion API.
=========

## Installation

  `npm install dandelion-api`

## Usage

### Initialize

```javascript
var API = require('node-dandelion');

var Dandelion = new API.Dandelion()

Dandelion.setToken('xxxxxxx');
```

### Entity Extraction
```js
Dandelion.getEntities({'text': 'The brown fox and the doctor'})
.then(function(data){
	console.log(data.body);
})
.catch(function(err){
	console.log(err);
});
```

### Sentiment
```js
Dandelion.getSentiment({'text': 'This is such a great library! I cannot believe I was able to survive in the wilderness without it by my side. You saved my life!!'})
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
 - Make default token.isQuery to true and token name to 'token' #1 
 
the API is generated by using [swagger-js-codegen](https://github.com/wcandillon/swagger-js-codegen) so most of the work is done by editing the .json OpenAPI definition. The generated file needs some tweaking so make sure you don't lose those changes 
