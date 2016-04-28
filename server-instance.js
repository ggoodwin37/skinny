var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});

var registerServerRoutes = require('./server-routes');

function startServerInstance(done) {
    var app = {
        config: config,
        inspect: inspect
    };

    // when running under c9 environment, we need to pull these values from env.
    // when running locally, fall back to config.
    var port = process.env.PORT;
    var host = process.env.IP;
    if (!port) {
        console.log('no port defined in env, using config instead.');
        port = config.serverPort;
    }
    if (!host) {
        console.log('no host defined in env, using config instead.');
        host = config.serverHost;
    }

    var server = new hapi.Server();
    server.connection({
        host: host,
        port: port
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
