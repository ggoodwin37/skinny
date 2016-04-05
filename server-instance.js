var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});

//var serverRoutes = require('./server-routes');

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
    var plugins = [
        require('inert')
    ];
    server.register(plugins, function(err) {
        if (err) throw err;

        // /s/* are client-side apps handled generically on the server
        // (client router picks up route from url)
        server.route({
            method: 'GET',
            path: '/s/{name*}',
            handler: function (request, reply) {
                return reply.file(__dirname + '/app.html');
            }
        });

        // /dist/* are static asset files
        server.route({
            method: 'GET',
            path: '/dist/{asset*}',
            handler: function (request, reply) {
                return reply.file(__dirname + '/dist/' + request.params.asset);
            }
        });

        server.start(function () {
            console.log('app is running at', server.info.uri);
            done && done(server, app);
        });
    });

    return server;
}

module.exports = startServerInstance;
