/*
  The purpose of this component tree is to display nodes in a grid graph such that they look like a maze. This is combined with the prim algo to generate mazes from msts.
*/
var React = require('react');
var classNames = require('classnames');

var MazeNodeView = React.createClass({
    render: function() {
        var nodeClassNames = classNames(
            'maze-node',
            {
                'closed-up': this.props.wallInfo.closedUp,
                'closed-down': this.props.wallInfo.closedDown,
                'closed-left': this.props.wallInfo.closedLeft,
                'closed-right': this.props.wallInfo.closedRight,
            }
        );
        return (
                <div className={nodeClassNames} />
        )
    }
});

var MazeView = React.createClass({
    render: function() {
        var wallInfo = this.calcWallInfo(this.props.graph, this.props.width, this.props.height);
        var thisRowNodes, rows = [], thisWallInfo, thisVert, thisKey;
        var vertOffs = 0;
        for (var j = 0; j < this.props.height; ++j) {
            thisRowNodes = [];
            for (var i = 0; i < this.props.width; ++i) {
                thisVert = this.props.graph.verts[vertOffs++];
                thisWallInfo = wallInfo[thisVert.id];
                thisKey = 'maze-node-' + thisVert.id;
                thisRowNodes.push(
                        <MazeNodeView wallInfo={thisWallInfo} key={thisKey}/>
                );
            }
            thisKey = 'maze-row-' + j;
            rows.push(
                    <div className={classNames('maze-view-row')} key={thisKey}>
                        {thisRowNodes}
                    </div>
            );
        }
        return (
                <div className={classNames('maze-view')} key={thisKey}>
                    {rows}
                </div>
        );
    },
    // return a map of node id to {closedUp, closedDown, closedLeft, closedRight} by analyzing edges and making assumptions about node order.
    calcWallInfo: function(graph, width, height) {
        var i, j, vertOffs = 0, thisVert;
        // make one pass through vertices and cache their x/y
        var posMap = {};
        for (j = 0; j < height; ++j) {
            for (i = 0; i < width; ++i) {
                thisVert = graph.verts[vertOffs++];
                posMap[thisVert.id] = {
                    x: i,
                    y: j
                };
            }
        }
        // make a second pass and determine if we're open or closed in each dir
        var thisPos, testPos, thisWallInfo, result = {};
        vertOffs = 0;
        for (j = 0; j < height; ++j) {
            for (i = 0; i < width; ++i) {
                thisWallInfo = {
                    closedUp: true,
                    closedDown: true,
                    closedLeft: true,
                    closedRight: true
                };
                thisVert = graph.verts[vertOffs++];
                thisPos = posMap[thisVert.id];
                thisVert.edges.forEach(function(thisEdge) {
                    testPos = posMap[thisEdge.otherVertId(thisVert.id)];
                    if (testPos.x < thisPos.x) thisWallInfo.closedLeft = false;
                    if (testPos.y < thisPos.y) thisWallInfo.closedUp = false;
                    if (testPos.x > thisPos.x) thisWallInfo.closedRight = false;
                    if (testPos.y < thisPos.y) thisWallInfo.closedDown = false;
                });
                result[thisVert.id] = thisWallInfo;
            }
        }
        return result;
    }
});

module.exports = MazeView;
