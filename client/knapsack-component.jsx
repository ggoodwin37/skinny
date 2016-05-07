var React = require('react');
var classNames = require('classnames');

var BackLinkComponent = require('./back-link-component.jsx');
var LogOutput = require('./log-output-component.jsx');

const componentTitle = 'Knapsack problem';
const componentDescription = 'A variation of the knapsack problem, where we are trying to maximize E while not going over MAX_L.';
var KnapsackComponent = React.createClass({
    testOne: function(input) {
        // TODO
    },
    testAll: function() {
        var msgs = ['TODO'];
        return msgs;
    },
    render: function() {
        var initialLogMessages = this.testAll();
        return (
                <div className={classNames('s-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <LogOutput initialMessages={initialLogMessages} ref={(loggerRef) => { this.logger = loggerRef }} />
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: KnapsackComponent,
    key: 'knapsack',
    title: componentTitle,
    descr: componentDescription
};
