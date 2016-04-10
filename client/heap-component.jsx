var React = require('react');
var classNames = require('classnames');

var BackLinkComponent = require('./back-link-component.jsx');
var LogOutput = require('./log-output-component.jsx');

var randomArray = require('./random-array');
var heapDataStruct = require('./heap-data-struct');

var HeapComponent = React.createClass({
    testHeap: function() {
        var heap = new heapDataStruct(randomArray(20));
        var msgs = [];
        msgs.push('Heap before sort: ' + heap.toString());
        heap.sortInPlace();
        msgs.push('Heap after sort: ' + heap.toString());
        return msgs;
    },
    render: function() {
        var title = 'Heap struct/heap sort.';
        var descr = 'O(n log n) for sorting.';
        var initialLogMessages = this.testHeap();
        return (
                <div className={classNames('s-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <LogOutput initialMessages={initialLogMessages} ref={(loggerRef) => { this.logger = loggerRef }} />
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = HeapComponent;
