var React = require('react');
var Link = require('react-router').Link;
var classNames = require('classnames');
var uuid = require('node-uuid');

var routeMap = require('./client-route-map');

var RootComponent = React.createClass({
    render: function() {
        var title = 'Skinny web app.';
        var linkNodes = routeMap.map(function(routeInfo, i) {
            var routeStr = '/s/' + routeInfo.key;
            return (
                <li key={uuid.v1()}>
                    <Link to={routeStr}>{routeStr}</Link>
                </li>
            )
            // TODO: add more stuff from the routeInfo here, like title, descr, and status (once we add that)
        });
        return (
            <div className={classNames('s-component')}>
                <h1 className="title">{title}</h1>
                <ul>
                    {linkNodes}
                </ul>
            </div>
        )
    }
});

module.exports = RootComponent;
