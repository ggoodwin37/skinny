var React = require('react');

var noMatchComponent = React.createClass({
    render: function() {
        return (
            <div>No client routes match this url.</div>
        );
    }
});

module.exports = noMatchComponent;
