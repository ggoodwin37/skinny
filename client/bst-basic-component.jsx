var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var randomString = require('./random-string');

var BstBasicComponent = React.createClass({
    render: function() {
        var title = 'Basic binary-sort-tree shit.';
        var descr = 'BST insert and in-order traversal.';

        // two ways to use logger: either run stuff first and accumlate output logs in this init array,
        // or wait until after render and log stuff dynamically to this.logger (set via ref hook).
        var initialLogMessages = []; // could just run all bst code first and accumulate logs, then output.
        return (
                <div className={classNames('s-component', 'bst-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <LogOutput initialMessages={initialLogMessages} ref={(loggerRef) => { this.logger = loggerRef }} />
                </div>
        );
    }
});

module.exports = BstBasicComponent;
