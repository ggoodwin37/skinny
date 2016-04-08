var React = require('react');
var classNames = require('classnames');

var AnimProgComponent = React.createClass({
    getInitialState: function() {
        return {
            isComplete: false
        };
    },
    render: function() {
        var title = 'Animating progress bar.';
        var descr = 'From 0% to 100% with no js (other than this description) (and that explanation).';
        var isComplete = this.state.isComplete;
        return (
                <div className={classNames('s-component', 'anim-prog-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <div className={classNames('prog-bar', {'complete': isComplete})}>
                        <div className="prog-bar-inner">
                        </div>
                    </div>
                </div>
        );
    },
    componentDidMount: function() {
        setTimeout(function() {
            this.setState({isComplete: true});
        }.bind(this), 750);
    }
});

module.exports = AnimProgComponent;
