var React = require('react');
var classNames = require('classnames');

var uuid = require('node-uuid');

var LogOutputComponent = React.createClass({
    getInitialState: function() {
        return {
            logMessages: [
                { message: 'a test message', id: uuid.v1() },
                { message: 'also a test', id: uuid.v1() }
            ]
        };
    },
    render: function() {
        var lineNodes = this.state.logMessages.map(function(oneMessage) {
            return (
                    <div className={classNames('log-line')} key={oneMessage.id}>{oneMessage.message}</div>
            );
        });
        return (
                <div className={classNames('log-output-component')}>
                    {lineNodes}
                </div>
        );
    },
    logLine: function(str) {
        this.state.logMessages.push({message: str, id: uuid.v1()});

        // make sure it doesn't get too long
        if (this.state.logMessages.length > maxMessages) {
            this.state.logMessages = this.state.logMessages.slice(this.state.logMessages.length - maxMessages);
        }
    }
});

module.exports = LogOutputComponent;
