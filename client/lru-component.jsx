var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var randomString = require('./random-string');

var lruCache = require('./lru-cache');

var LruComponent = React.createClass({
    testLru: function() {
        var msgs = [];
        var lru = new lruCache(3);
        msgs.push('fresh cache (maxSize=3): ' + lru.toString());
        lru.set('a', 'alphabet');
        lru.set('b', 'billiards');
        msgs.push('set two: ' + lru.toString());
        lru.set('c', 'colada');
        msgs.push('one more, full now: ' + lru.toString());
        lru.set('d', 'derby');
        msgs.push('added one more, dropped oldest: ' + lru.toString());
        var foo = lru.get('b');
        msgs.push('freshened b: ' + lru.toString());
        lru.set('e', 'earnest');
        msgs.push('another new one: ' + lru.toString());
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
