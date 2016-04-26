var nextId = 256;
function getNextId() {
    return nextId++;
}

function vert() {
    this.id = getNextId();
    this.edges = [];
}
vert.prototype.addEdge = function(edge) {
    this.edges.push(edge);
}

function edge(a, b, weight) {
    this.id = getNextId();
    this.verts = [a, b];
    this.weight = weight;
}
edge.prototype.otherVert = function(thisVert) {
    if (this.verts[0] === thisVert) return this.verts[1];
    if (this.verts[1] === thisVert) return this.verts[0];
    console.error('bad vert');
    return null;
}

function weightedGraph() {
    this.verts = [];
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
            newEdge = new edge(v1, v2, weight);
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
            newEdge = new edge(v1, v2, weight);
            v1.addEdge(newEdge);
            v2.addEdge(newEdge);
        }
    }
}
weightedGraph.prototype.addVert = function(vert) {
    this.verts.push(vert);
}
// return a new graph representing the minimal spanning tree of this graph, using Prim's algorithm.
weightedGraph.prototype.prim = function() {
    // LOL TODO
}

module.exports = weightedGraph;
