var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});

function startServerInstance(done) {

    var app = {
        config: config,
        inspect: inspect
    };

    var server = new hapi.Server();
    server.connection({
        host: config.serverHost,
        port: config.serverPort
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply('<a href="/s/test">test</a>');
        }
    });
    server.route({
        method: 'GET',
        path: '/s/{name*}',
        handler: function (request, reply) {
            // TODO: best way to return an html page with links here?
            reply('<h1>Hi ' + encodeURIComponent(request.params.name) + ' :D</h1>');
        }
    });

    server.start(function () {
        console.log('app is running at', server.info.uri);
    });
    return server;
}

module.exports = startServerInstance;
