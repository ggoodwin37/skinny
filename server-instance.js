'use strict';
const hapi = require('hapi');
const config = require('getconfig');
const inspect = require('eyes').inspector({maxLength: null});

const registerServerRoutes = require('./server-routes');

function startServerInstance(done) {
    const app = {
        config: config,
        inspect: inspect
    };

    // when running under cloud environment (c9, gae), we need to pull port number from env.
    // when running locally, fall back to config.
    const serverOptions = {};
    let port = process.env.PORT;
    if (!port) {
        console.log('no port defined in env, using config instead.');
        port = config.serverPort;
    }
    console.log(`using port ${port}`);
    serverOptions['port'] = port;

    let host = process.env.IP;
    if (host) {
        serverOptions['host'] = host;
    } else {
        console.log('no host defined in env, omitting from server options.');
    }

    const server = new hapi.Server();
    server.connection(serverOptions);

    const plugins = [
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
