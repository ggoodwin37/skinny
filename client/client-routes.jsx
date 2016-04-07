var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var React = require('react');
var ReactDOM = require('react-dom');

var noMatchComponent = require('./no-match-component.jsx');

const routeMap = [
    {name: 'test', component: require('./test-component.jsx') },
    {name: 'test2', component: require('./test2-component.jsx') },
    {name: 'pascal', component: require('./pascal-component.jsx') },
];

// using createElement instead of jsx here because we need to generate a dynamic list of children.
// the trick is the .apply call which allows us to use the spread-arg flavor of createElement even
// though we're building the child route list dynamically.
function setupClientRoutes() {
    var routes = routeMap.map(function(routeInfo) {
        return React.createElement(Route, {
            path: '/s/' + routeInfo.name,
            component: routeInfo.component
        });
    });
    routes.push(React.createElement(Route, {
        path: '*',
        component: noMatchComponent
    }));
    var routeEl = React.createElement.apply(null, [Router, {history: browserHistory}].concat(routes));
    ReactDOM.render(routeEl, document.getElementById('main'));
}

module.exports = setupClientRoutes;
