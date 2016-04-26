var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var BackLinkComponent = require('./back-link-component.jsx');

var weightedGraph = require('./weighted-graph-data-struct');

const componentTitle = 'Prim.';
const componentDescription = 'Build a minimal spanning tree using Prim\'s algo.';
var PrimComponent = React.createClass({
    render: function() {
        var testGraph = new weightedGraph();
        testGraph.randomWeightGrid(2, 2);
        debugger;
        return (
                <div><h1>TODO</h1><BackLinkComponent /></div>
        );
    }
});

module.exports = {
    component: PrimComponent,
    key: 'prim',
    title: componentTitle,
    descr: componentDescription
};
