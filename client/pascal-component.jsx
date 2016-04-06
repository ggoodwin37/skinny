var React = require('react');
var classNames = require('classnames');

var testComponent = React.createClass({
    render: function() {
        var title = 'This is the Pascal\'s triangle component.';
        var descr = 'Show Pascal\'s triangle, using flexbox, and highlight odd numbers to look for patterns.';
        return (
                <div className={classNames('s-component', 'pascal-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                </div>
        );
    }
});

module.exports = testComponent;
