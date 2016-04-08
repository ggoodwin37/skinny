var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var randomString = require('./random-string');

var lruCache = require('./lru-cache');

var LruComponent = React.createClass({
    testLru: function() {
        var msgs = [];
        msgs.push('fuck you');
        // TODO
        return msgs;
    },
    render: function() {
        var title = 'LRU cache.';
        var descr = 'O(1) for get and set.';
        var initialLogMessages = this.testLru();
        return (
                <div className={classNames('s-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <LogOutput initialMessages={initialLogMessages} ref={(loggerRef) => { this.logger = loggerRef }} />
                </div>
        );
    }
});

module.exports = LruComponent;
