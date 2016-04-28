var React = require('react');
var classNames = require('classnames');

var BackLinkComponent = require('./back-link-component.jsx');
var LogOutput = require('./log-output-component.jsx');

const componentTitle = 'Uncle Morty problem.';
const componentDescription = 'Given a large series of number strings, return each that might be suitable for alottery ticket pick. Note that a valid lottery ticket must have 7 unique numbers between 1 and 59, digits must be used in order, and every digit must be used.';
var MortyComponent = React.createClass({
    execute: function() {
        return ['TODO'];
    },
    render: function() {
        var initialLogMessages = this.execute();
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
    component: MortyComponent,
    key: 'uncle-morty',
    title: componentTitle,
    descr: componentDescription
};
