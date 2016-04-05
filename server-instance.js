var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});

var getMoonbootsPlugin = require('./moonboots-plugin');

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
		path: '/s/{name}',
		handler: function (request, reply) {
			reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
		}
	});

	var plugins = [
		getMoonbootsPlugin(config)
	];
	server.register(plugins, function (err) {
		if (err) throw err;
		server.start(function () {
			console.log('app is running at', server.info.uri);
			done && done(server, app);
		});
	});
	return server;
}

module.exports = startServerInstance;
