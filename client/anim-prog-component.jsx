var React = require('react');
var classNames = require('classnames');

var AnimProgComponent = React.createClass({
    render: function() {
        var title = 'Animating progress bar.';
        var descr = 'From 0% to 100% with no js (other than this description) (and that explanation).';
        return (
                <div className={classNames('s-component', 'anim-prog-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <div className="prog-bar">
                        <div className="prog-bar-inner">
                        </div>
                    </div>
                </div>
        );
    }
});

module.exports = AnimProgComponent;
