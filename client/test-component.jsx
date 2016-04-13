var React = require('react');

var BackLinkComponent = require('./back-link-component.jsx');

const componentTitle = 'Test1';
const componentDescription = 'React/jsx hello world.';
var testComponent = React.createClass({
    render: function() {
        return (
                <div>
                    <h1>{componentTitle}</h1>
                    <span>{componentDescription}</span>
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: testComponent,
    key: 'test1',
    title: componentTitle,
    descr: componentDescription
};
