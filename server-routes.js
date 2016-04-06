// all existing client-side routes listed here for convenience
const sRoutes = [
    'test',
    'test2'
];

function registerServerRoutes(server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            var responseHtml = '<ul>' + sRoutes.map(name => {
                return '<li><a href="/s/' + name + '">' + name + '</a></li>';
            }).join('') + '</ul>';
            reply(responseHtml);
        }
    });

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
}

module.exports = registerServerRoutes;
