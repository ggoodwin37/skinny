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
    var plugins = [
        require('inert')
    ];
    server.registerPlugins(plugins, function(err) {
        if (err) throw err;

        server.route({
            method: 'GET',
            path: '/s/{name*}',
            handler: function (request, reply) {
                return reply.file(__dirname + '/app.html');
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
