var React = require('react');
var classNames = require('classnames');

var BackLinkComponent = require('./back-link-component.jsx');
var LogOutput = require('./log-output-component.jsx');

var randomArray = require('./random-array');
var heapDataStruct = require('./heap-data-struct');

const componentTitle = 'Heap struct/heap sort.';
const componentDescription = 'O(n log n) for sorting.';
var HeapComponent = React.createClass({
    testHeap: function() {
        var heap = new heapDataStruct(randomArray(300));
        var msgs = [];
        msgs.push('Heap before sort: ' + heap.toString());
        heap.sortInPlace();
        msgs.push('Heap after sort: ' + heap.toString());

        // make sure it's sorted correctly
        var sorted = true, maxVal = 0;
        for (var i = 0; i < heap.data.length; ++i) {
            const thisData = heap.data[i];
            if (thisData < maxVal) {
                sorted = false;
                console.log('sort fail detected. thisData=' + thisData + ' maxVal=' + maxVal + ' i=' + i);
            }
            maxVal = thisData;
        }
        msgs.push(sorted ? 'Data is sorted correctly!' : ' Data not sorted, you really suck.');
        return msgs;
    },
    render: function() {
        var initialLogMessages = this.testHeap();
        return (
                <div className={classNames('s-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <LogOutput initialMessages={initialLogMessages} ref={(loggerRef) => { this.logger = loggerRef }} />
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: HeapComponent,
    key: 'heap',
    title: componentTitle,
    descr: componentDescription
};
