/*jshint -W069 */
/**
 * Unofficial Dandelion NodeJS API
 * @class Dandelion
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Dandelion = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Dandelion(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.dandelion.eu/datatxt';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    Dandelion.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });
    };

    /**
     * Set Token
     * @method
     * @name Dandelion#setToken
     * @param {string} value - token's value
     * @param {string} headerOrQueryName - the header or query name to send the token at
     * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
     *
     */
    Dandelion.prototype.setToken = function(value) {
        this.token.value = value;
        this.token.headerOrQueryName = 'token';
        this.token.isQuery = true;
    };

    /**
     * 
     * @method
     * @name Dandelion#getEntities
     * @param {string} text - use "text" when you have plain text that doesn't need any pre-processing
     * @param {string} url - use "url" when you have an URL and you want the Entity Extraction API to work on its main content; it will fetch the URL for you, and use an AI algorithm to extract the relevant part of the document to work on; in this case, the main content will also be returned by the API to allow you to properly use the annotation offsets;
     * @param {string} html - use "html" when you have an HTML document and you want the Entity Extraction API to work on its main content, similarly to what the "url" parameter does.
     * @param {string} url - use "html_fragment" when you have an HTML snippet and you want the Entity Extraction API to work on its content. It will remove all HTML tags before analyzing it.
     * @param {string} lang - The language of the text to be annotated; currently English, French, German, Italian and Portuguese are supported. Leave this parameter out to let the Entity Extraction API automatically detect the language for you.
     * 
     */
    Dandelion.prototype.getEntities = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/nex/v1';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['text'] !== undefined) {
            queryParameters['text'] = parameters['text'];
        }

        if (parameters['url'] !== undefined) {
            queryParameters['url'] = parameters['url'];
        }

        if (parameters['html'] !== undefined) {
            queryParameters['html'] = parameters['html'];
        }

        if (parameters['url'] !== undefined) {
            queryParameters['url'] = parameters['url'];
        }

        if (parameters['lang'] !== undefined) {
            queryParameters['lang'] = parameters['lang'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * 
     * @method
     * @name Dandelion#getSentiment
     * @param {string} text - use "text" when you have plain text that doesn't need any pre-processing
     * @param {string} url - use "url" when you have an URL and you want the Entity Extraction API to work on its main content; it will fetch the URL for you, and use an AI algorithm to extract the relevant part of the document to work on; in this case, the main content will also be returned by the API to allow you to properly use the annotation offsets;
     * @param {string} html - use "html" when you have an HTML document and you want the Entity Extraction API to work on its main content, similarly to what the "url" parameter does.
     * @param {string} url - use "html_fragment" when you have an HTML snippet and you want the Entity Extraction API to work on its content. It will remove all HTML tags before analyzing it.
     * @param {string} lang - The language of the text to be annotated; currently only English and Italian are supported.
     * 
     */
    Dandelion.prototype.getSentiment = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/sent/v1';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['text'] !== undefined) {
            queryParameters['text'] = parameters['text'];
        }

        if (parameters['url'] !== undefined) {
            queryParameters['url'] = parameters['url'];
        }

        if (parameters['html'] !== undefined) {
            queryParameters['html'] = parameters['html'];
        }

        if (parameters['url'] !== undefined) {
            queryParameters['url'] = parameters['url'];
        }

        if (parameters['lang'] !== undefined) {
            queryParameters['lang'] = parameters['lang'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return Dandelion;
})();

exports.Dandelion = Dandelion;