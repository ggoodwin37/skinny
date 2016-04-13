var React = require('react');
var Link = require('react-router').Link;

var BackLinkComponent = require('./back-link-component.jsx');

const componentTitle = 'Test component 2';
const componentDescription = 'This is the second test component. It lives in the shadow of the primary one.';
var test2Component = React.createClass({
    render: function() {
        return (
                <div>
                    <h1>{componentTitle}</h1>
                    <div>{componentDescription}</div>
                    <Link to="/s/test1">Client link to original test component.</Link>
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: test2Component,
    key: 'test2',
    title: componentTitle,
    descr: componentDescription
};
