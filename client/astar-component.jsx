var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var BackLinkComponent = require('./back-link-component.jsx');
var MazeViewComponent = require('./maze-graph-view.jsx');

var weightedGraph = require('./weighted-graph-data-struct');

const componentTitle = 'A*';
const componentDescription = 'Use A* pathfinding algorithm to solve a maze that we generated using the earlier Prim implementation.';
var AstarComponent = React.createClass({
    render: function() {
        const width = 24, height = 24;
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
    component: AstarComponent,
    key: 'astar',
    title: componentTitle,
    descr: componentDescription
};
