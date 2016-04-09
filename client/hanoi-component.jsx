var React = require('react');
var classNames = require('classnames');
var BackLinkComponent = require('./back-link-component.jsx');

var hanoiDataStruct = require('./hanoi-data-struct');

var HanoiView = React.createClass({
    render: function() {
        return (
                <h1>TODO: HanoiView</h1>
        );
    },
    componentDidMount: function() {
    }
});

var HanoiComponent = React.createClass({
    render: function() {
        var title = 'Tower of Hanoi.';
        var descr = 'CS101 style.';
        return (
                <div className={classNames('s-component', 'hanoi-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <HanoiView />
                    <BackLinkComponent />
                </div>
        );
    },
    componentDidMount: function() {
        // TODO: step hanoi here
        // setTimeout(function() {
        //     this.setState({isComplete: true});
        // }.bind(this), 750);
    }
});

module.exports = HanoiComponent;
