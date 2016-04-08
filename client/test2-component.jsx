var React = require('react');
var Link = require('react-router').Link;

var BackLinkComponent = require('./back-link-component.jsx');

var testComponent = React.createClass({
    render: function() {
        return (
                <div>
                    <h1>This is the secondary test component</h1>
                    <div>It lives in the shadow of the primary one.</div>
                    <Link to="/s/test">Client link to original test component.</Link>
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = testComponent;
