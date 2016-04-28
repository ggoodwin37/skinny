var nextId = 256;
function getNextId() {
    return '' + nextId++;
}

function vert(id) {
    // note on vert ids: these are not unique across all vert instances
    // because we can copy verts by id when making related graphs.
    this.id = id || getNextId();
    this.edges = [];
}
vert.prototype.addEdge = function(edge) {
    this.edges.push(edge);
}

// edges refer to verts by id
function edge(idA, idB, weight) {
    this.vertIds = [idA, idB];
    this.weight = weight;
}
edge.prototype.otherVertId = function(thisVertId) {
    if (this.vertIds[0] === thisVertId) return this.vertIds[1];
    if (this.vertIds[1] === thisVertId) return this.vertIds[0];
    console.error('bad vert');
    return null;
}

function weightedGraph() {
    this.verts = [];
    this.vertCache = {};
}
weightedGraph.prototype.sortVerts = function() {
    // in general we don't care about the order of vertices in our list.
    // but for ease of visualization of grid graphs, it's useful to have the verts in order.
    // a more robust approach would be to store layout info with the vert, rather than
    // inferring layout from the vert's index
    this.verts.sort(function(a, b) {
        return parseInt(a.id) - parseInt(b.id);
    });
}
weightedGraph.prototype.addVert = function(vert) {
    this.verts.push(vert);
    this.vertCache[vert.id] = vert;
}
weightedGraph.prototype.getVertById = function(id) {
    return this.vertCache[id];
}
weightedGraph.prototype.randomWeightGrid = function(width, height) {
    var i, j, offs, v1, v2, newEdge, weight;
    for (j = 0; j < height; ++j) {
        for (i = 0; i < width; ++i) {
            this.addVert(new vert());
        }
    }
    // for each row, create (width - 1) edges between verts in that row
    for (j = 0; j < height; ++j) {
        for (i = 0; i < width - 1; ++i) {
            v1 = this.verts[(j * width) + i];
            v2 = this.verts[(j * width) + i + 1];
            weight = Math.random();
            newEdge = new edge(v1.id, v2.id, weight);
            v1.addEdge(newEdge);
            v2.addEdge(newEdge);
        }
    }
    // for each column, create (height - 1) edges between the verts in that column
    for (j = 0; j < height - 1; ++j) {
        for (i = 0; i < width; ++i) {
            v1 = this.verts[(j * width) + i];
            v2 = this.verts[((j + 1) * width) + i];
            weight = Math.random();
            newEdge = new edge(v1.id, v2.id, weight);
            v1.addEdge(newEdge);
            v2.addEdge(newEdge);
        }
    }
}
// return a new graph representing the minimal spanning tree of this graph, using Prim's algorithm.
weightedGraph.prototype.prim = function() {
    function initQ(verts) {
        return verts.reduce(function(map, vert) {
            map[vert.id] = true;
            return map;
        }, {});
    }
    function initCostMap(verts) {
        // key: vertex id
        // value, {c: cheapest connection, if known, e: edge corresponding to cheapest connection, or null if no connection yet to this vertex}
        return verts.reduce(function(map, vert) {
            map[vert.id] = {
                c: 1, // assuming our weights are [0,1]
                e: null
            };
            return map;
        }, {});
    }
    function pullNextVertId(verts, costMap, q) {
        var lowestWeight = null, lowestVertId = null;
        verts.forEach(function(thisVert) {
            if (!q[thisVert.id]) {
                return;
            }
            const thisCostInfo = costMap[thisVert.id];
            if (lowestWeight === null || thisCostInfo.c < lowestWeight) {
                lowestWeight = thisCostInfo.c;
                lowestVertId = thisVert.id;
            }
        });
        if (lowestVertId) {
            delete q[lowestVertId];
        }
        return lowestVertId;
    }
    function doNext(currentVert, result, costMap, edgeList, q) {
        // copy the existing vert along with the lowest-cost edge.
        var newVert = new vert(currentVert.id);
        const currentCostData = costMap[currentVert.id];
        result.addVert(newVert);
        if (currentCostData.e) {
            edgeList.push(currentCostData.e);
        }

        currentVert.edges.forEach(function(thisEdge) {
            const otherId = thisEdge.otherVertId(currentVert.id);
            if (q[otherId]) {
                const otherCostData = costMap[otherId];
                if (otherCostData.c > thisEdge.weight) {
                    otherCostData.c = thisEdge.weight;
                    otherCostData.e = thisEdge;
                }
            }
        });
    }

    // TODO: make this asynchronous
    // a new graph representing the minimal spanning tree of this graph.
    var result = new weightedGraph();
    // the set of available verts
    var q = initQ(this.verts);
    // lowest-cost-edge data generated as we go
    var costMap = initCostMap(this.verts);
    // the id of the vert currently being added
    var currentVertId = pullNextVertId(this.verts, costMap, q);
    // list of edges to add to result
    var edgeList = [];
    while (currentVertId) {
        var currentVert = this.getVertById(currentVertId);
        doNext(currentVert, result, costMap, edgeList, q);
        currentVertId = pullNextVertId(this.verts, costMap, q);
    }
    // add all optimal edges we collected during the above iteration.
    edgeList.forEach(function(thisEdge) {
        result.getVertById(thisEdge.vertIds[0]).addEdge(thisEdge);
        result.getVertById(thisEdge.vertIds[1]).addEdge(thisEdge);
    });
    result.sortVerts();
    return result;
}

module.exports = weightedGraph;
