var React = require('react');
var classNames = require('classnames');
var BackLinkComponent = require('./back-link-component.jsx');

const componentTitle = 'Animating progress bar.';
const componentDescription = 'From 0% to 100% with no js (other than this description) (and that explanation).';
var AnimProgComponent = React.createClass({
    getInitialState: function() {
        return {
            isComplete: false
        };
    },
    render: function() {
        var isComplete = this.state.isComplete;
        return (
                <div className={classNames('s-component', 'anim-prog-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <div className={classNames('prog-bar', {'complete': isComplete})}>
                        <div className="prog-bar-inner">
                        </div>
                    </div>
                    <BackLinkComponent />
                </div>
        );
    },
    componentDidMount: function() {
        setTimeout(function() {
            this.setState({isComplete: true});
        }.bind(this), 750);
    }
});

module.exports = {
    component: AnimProgComponent,
    key: 'anim-prog',
    title: componentTitle,
    descr: componentDescription
};
