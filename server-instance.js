var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});

var getMoonbootsPlugin = require('./moonboots-plugin');
var getRouter = require('./router');

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
		getMoonbootsPlugin(config),
//		getRouter(app)
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
