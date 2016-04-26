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
    function initCostMap(verts) {
        // key: vertex id
        // value, {c: cheapest connection, if known, e: edge corresponding to cheapest connection, or null if no connection yet to this vertex}
        var costMap = {};
        verts.forEach(function(thisVert) {
            costMap[thisVert.id] = {
                c: null,
                e: null,
            };
        });
        return costMap;
    }
    function getNextVertId(verts, costMap) {
        var lowestWeight = null, lowestVertId;
        verts.forEach(function(thisVert) {
            costMap[thisVert.id] = {
                c: null,
                e: null,
            };
            thisVert.edges.forEach(function(thisEdge) {
                if (lowestWeight === null || lowestWeight > thisEdge.weight) {
                    lowestWeight = thisEdge.weight;
                    lowestVertId = thisEdge.vertIds[0];  // just pick one
                }
            });
        });
        return lowestVertId;
    }
    function doNext(currentVert, result, costMap) {
        var oldVertData = costMap[currentVert.id];
        console.assert(oldVertData);
        delete costMap[currentVert.id];

        // copy the existing vert along with the lowest-cost edge.
        var newVert = new vert(currentVert.id);
        if (oldVertData.e) {
            newVert.addEdge(oldVertData.e);
        }
        result.addVert(newVert);

        currentVert.edges.forEach(function(thisEdge) {
            var otherCostData = costMap[thisEdge.otherVertId(currentVert.id)];
            if (otherCostData) {
                if (otherCostData.c === null || otherCostData.c > thisEdge.weight) {
                    otherCostData.c = thisEdge.weight;
                    otherCostData.e = thisEdge;
                }
            }
        });
    }

    // TODO: make this asynchronous
    // a new graph representing the minimal spanning tree of this graph.
    var result = new weightedGraph();
    // represents vertices available to be added to the mst
    var costMap = initCostMap(this.verts);
    // the id of the vert currently being added
    var currentVertId = getNextVertId(this.verts, costMap);
    while (currentVertId) {
        var currentVert = this.getVertById(currentVertId);
        doNext(currentVert, result, costMap);
        currentVertId = getNextVertId(this.verts, costMap);
    }
    return result;
}

module.exports = weightedGraph;
