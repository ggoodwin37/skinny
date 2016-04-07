var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var randomString = require('./random-string');

var BstBasicComponent = React.createClass({
    render: function() {
        setInterval(() => {
            if (this.logger) {
                this.logger.logLine(randomString());
            }
        }, 500);
        var title = 'Basic binary-sort-tree shit.';
        var descr = 'BST insert and in-order traversal.';
        return (
                <div className={classNames('s-component', 'bst-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <LogOutput ref={(loggerRef) => { this.logger = loggerRef }} />
                </div>
        );
    }
});

module.exports = BstBasicComponent;
