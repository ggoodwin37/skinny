var React = require('react');
var classNames = require('classnames');

var LogOutputComponent = React.createClass({
    render: function() {
        return (
                <div className={classNames('log-output-component')}>
                    <div className={classNames('log-line')}>Sample log output</div>
                    <div className={classNames('log-line')}>SYSTEM CRASH</div>
                    <div className={classNames('log-line')}>Error 506</div>
                </div>
        );
    }
});

module.exports = LogOutputComponent;
