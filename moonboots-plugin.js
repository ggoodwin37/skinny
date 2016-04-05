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
					console.log('beforeBuildJS');
					// TODO: react?
				},
				beforeBuildCSS: function() {
					console.log('beforeBuildCSS');
					// TODO: need to manually fire less here?
				}
			}
		}
	};
	return moonbootsPlugin;
}

module.exports = getMoonbootsPlugin;
