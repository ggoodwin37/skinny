var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});

var registerServerRoutes = require('./server-routes');

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

    var plugins = [
        require('inert')
    ];
    server.register(plugins, function(err) {
        if (err) throw err;

        registerServerRoutes(server);

        server.start(function () {
            console.log('app is running at', server.info.uri);
            done && done(server, app);
        });
    });

    return server;
}

module.exports = startServerInstance;
