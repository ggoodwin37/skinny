var React = require('react');
var classNames = require('classnames');

var uuid = require('node-uuid');

const maxMessages = 50;

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
            logMessages: this.props.initialMessages.map((oneMessage) => {
                return { message: oneMessage, id: uuid.v1() };
            })
        };
    },
    render: function() {
        var lineNodes = this.state.logMessages.map(function(oneMessage) {
            return (
                    <div className={classNames('log-line')} key={oneMessage.id}>{oneMessage.message}</div>
            );
        });
        return (
                <div className={classNames('log-output-component')} ref={(el) => { el && this.checkScroll(el); } }>
                    {lineNodes}
                </div>
        );
    },
    checkScroll: function(el) {
        el.scrollTop = el.scrollHeight;
    }
});

module.exports = LogOutputComponent;
