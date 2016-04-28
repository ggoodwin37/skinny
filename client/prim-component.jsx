var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var BackLinkComponent = require('./back-link-component.jsx');
var MazeViewComponent = require('./maze-graph-view.jsx');

var weightedGraph = require('./weighted-graph-data-struct');

const componentTitle = 'Prim.';
const componentDescription = 'Build a minimal spanning tree using Prim\'s algo.';
var PrimComponent = React.createClass({
    render: function() {
        const width = 96, height = 96;
        var testGraph = new weightedGraph();
        testGraph.randomWeightGrid(width, height);
        var prim = testGraph.prim();
        return (
                <div className={classNames('s-component', 'prim-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <MazeViewComponent graph={prim} width={width} height={height} />
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: PrimComponent,
    key: 'prim',
    title: componentTitle,
    descr: componentDescription
};
