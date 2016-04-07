var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');

var BstBasicComponent = React.createClass({
    render: function() {
        var title = 'Basic binary-sort-tree shit.';
        var descr = 'BST insert and in-order traversal.';
        var logger = React.createElement(LogOutput, null);
        return (
                <div className={classNames('s-component', 'bst-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    {logger}
                </div>
        );
    }
});

module.exports = BstBasicComponent;
