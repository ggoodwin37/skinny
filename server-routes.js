function registerServerRoutes(server) {
    function clientApp(request, reply) {
        return reply.file(__dirname + '/app.html');
    }

    // these are all client-side routes, handled generically on the server.
    // (client router picks up route from url)
    server.route({
        method: 'GET',
        path: '/',
        handler: clientApp
    });
    server.route({
        method: 'GET',
        path: '/s/{name*}',
        handler: clientApp
    });

    // /dist/* are static autogenerated asset files
    server.route({
        method: 'GET',
        path: '/dist/{asset*}',
        handler: function (request, reply) {
            return reply.file(__dirname + '/dist/' + request.params.asset);
        }
    });
    // /static/* are static non-autogenerated asset files
    server.route({
        method: 'GET',
        path: '/static/{asset*}',
        handler: function (request, reply) {
            return reply.file(__dirname + '/static/' + request.params.asset);
        }
    });
}

module.exports = registerServerRoutes;
