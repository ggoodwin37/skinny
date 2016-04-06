var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var React = require('react');
var ReactDOM = require('react-dom');

var testComponent = require('./test-component.jsx');
var test2Component = require('./test2-component.jsx');
var noMatchComponent = require('./no-match-component.jsx');

function setupClientRoutes() {
    ReactDOM.render((
            <Router history={browserHistory}>
                <Route path="/s/test" component={testComponent}></Route>
                <Route path="/s/test2" component={test2Component}></Route>
                <Route path="*" component={noMatchComponent}></Route>
            </Router>
    ), document.getElementById('main'));
}

module.exports = setupClientRoutes;
