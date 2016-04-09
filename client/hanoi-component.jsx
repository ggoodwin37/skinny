var React = require('react');
var classNames = require('classnames');
var BackLinkComponent = require('./back-link-component.jsx');

var hanoiDataStruct = require('./hanoi-data-struct');

var HanoiStackView = React.createClass({
    render: function() {
        const stack = this.props.stack;
        var pieceNodes = stack.map(function(piece) {
            var classes = classNames('hanoi-piece', 'hanoi-piece-' + piece.val);
            return (
                    <span className={classes} key={piece.id}>{piece.val}</span>
            );
        });
        return (
                <div className={classNames('hanoi-stack')}>
                    {pieceNodes}
                </div>
        );
    }
});

var HanoiView = React.createClass({
    render: function() {
        const hanoi = this.props.hanoi;
        var stackNodes = hanoi.stacks.map(function(stack, i) {
            var key = 'hanoi-stack-' + i;
            return (
                    <HanoiStackView stack={stack} key={key} />
            );
        });
        return (
                <div className={classNames('hanoi-view')}>
                    {stackNodes}
                </div>
        );
    }
});

var HanoiComponent = React.createClass({
    render: function() {
        var title = 'Tower of Hanoi.';
        var descr = 'CS101 style.';
        if (!this.hanoi) {
            this.hanoi = new hanoiDataStruct();
        }
        return (
                <div className={classNames('s-component', 'hanoi-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <HanoiView hanoi={this.hanoi} />
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
