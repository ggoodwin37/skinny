var React = require('react');
var classNames = require('classnames');

var uuid = require('node-uuid');

const maxMessages = 10;

var LogOutputComponent = React.createClass({
    logLine: function(str) {
        var newMessages = this.state.logMessages.concat({message:str, id:uuid.v1()});

        // make sure it doesn't get too long
        if (newMessages.length > maxMessages) {
            newMessages = newMessages.slice(newMessages.length - maxMessages);
        }

        this.setState({logMessages: newMessages});
    },
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
    }
});

module.exports = LogOutputComponent;
