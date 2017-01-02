var fs = require('fs');
var CodeGen = require('swagger-js-codegen').CodeGen;

var file = 'api.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var nodejsSourceCode = CodeGen.getNodeCode({ className: 'Dandelion', swagger: swagger });

fs.writeFile("dandelion.js", nodejsSourceCode, function(err) {});