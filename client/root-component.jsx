var React = require('react');
var Link = require('react-router').Link;
var classNames = require('classnames');

var routeMap = require('./client-route-map.jsx');

var RootComponent = React.createClass({
    render: function() {
        var title = 'Skinny web app.';
        var linkNodes = routeMap.map(function(routeInfo, i) {
            var routeStr = '/s/' + routeInfo.name;
            var linkKey = 'root-component-link-key-' + i;
            return (
                <li key={linkKey}>
                    <Link to={routeStr}>{routeStr}</Link>
                </li>
            )
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
