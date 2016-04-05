function getMoonbootsPlugin(config) {
	var moonbootsPlugin = {
		register: require('moonboots_hapi'),
		options: {
			appPath: '/s/{name*}',
			moonboots: {
				main: __dirname + '/client/app.js',
				developmentMode: config.isDev,
				stylesheets: [
					__dirname + '/dist/css/main.css'
				],
				beforeBuildJS: function() {
					// TODO: react?
				},
				beforeBuildCSS: function() {
					// TODO: consider gulping from here?
				}
			}
		}
	};
	return moonbootsPlugin;
}

module.exports = getMoonbootsPlugin;
