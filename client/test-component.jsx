var React = require('react');

var BackLinkComponent = require('./back-link-component.jsx');

var testComponent = React.createClass({
    render: function() {
        return (
            <div><h1>This is test component</h1><span>Try not to be too amazed.</span><BackLinkComponent /></div>
        );
    }
});

module.exports = testComponent;
