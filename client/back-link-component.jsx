var React = require('react');
var Link = require('react-router').Link;
var classNames = require('classnames');

var BackLinkComponent = React.createClass({
    render: function() {
        return (
                <Link className={classNames('back-link')} to="/">Back to list</Link>
        );
    }
});

module.exports = BackLinkComponent;
