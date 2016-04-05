function getMoonbootsPlugin(config) {
	var moonbootsPlugin = {
		register: require('moonboots_hapi'),
		options: {
			appPath: '/*',
			moonboots: {
				main: __dirname + '/client/app.js',
				developmentMode: config.isDev,
				stylesheets: [
					__dirname + '/dist/css/main.css'
				],
				beforeBuildJS: function() {
					// TODO: react?
				}
			}
		}
	};
	return moonbootsPlugin;
}

module.exports = getMoonbootsPlugin;
