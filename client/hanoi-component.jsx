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
        const stacks = this.props.stacks;
        var stackNodes = stacks.map(function(stack, i) {
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

const componentTitle = 'Tower of Hanoi.';
const componentDescription = 'CS101 style.';
var HanoiComponent = React.createClass({
    getInitialState: function() {
        this.hanoi = new hanoiDataStruct(10);
        return {
            stacks: this.hanoi.stacks
        };
    },
    render: function() {
        return (
                <div className={classNames('s-component', 'hanoi-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <HanoiView stacks={this.state.stacks} />
                    <BackLinkComponent />
                </div>
        );
    },
    componentDidMount: function() {
        const stepDelayMs = 150;
        var solveStates = this.hanoi.getSolveStates(), iState = 0;
        if (solveStates.length === 0) {
            return;
        }
        var intervalId = window.setInterval(function() {
            const thisState = solveStates[iState++];
            this.setState({
                stacks: thisState
            });
            if (iState === solveStates.length) {
                window.clearInterval(intervalId);
            }
        }.bind(this), stepDelayMs);
    }
});

module.exports = {
    component: HanoiComponent,
    key: 'hanoi',
    title: componentTitle,
    descr: componentDescription
};
