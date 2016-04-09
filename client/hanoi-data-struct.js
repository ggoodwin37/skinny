var uuid = require('node-uuid');
var deepCopy = require('deepcopy');

function hanoiPiece(val) {
    this.val = val;
    this.id = uuid.v1();
}
function hanoiDataStruct(numPieces) {
    this.numPieces = numPieces;
    this.stacks = [ [], [], [] ];
    for (var i = this.numPieces; i >= 1; i--) {
        this.stacks[0].push(new hanoiPiece(i));
    }
}
hanoiDataStruct.prototype.getSolveStates = function() {
    // making the solution algorithm recursive was a pain,
    // so instead just record each intermediate state as
    // we solve it, and play them back in the UI :P
    var solveStates = [];
    solveHanoi(this.stacks, this.numPieces, 0, 2, solveStates);
    return solveStates;
}

function solveHanoi(stacks, moveN, from, to, solveStates) {
    function moveOnePiece() {
        // sanity
        if (stacks[to].length > 0) {
            console.assert(stacks[to][stacks[to].length - 1].val > stacks[from][stacks[from].length - 1].val);
        }
        stacks[to].push(stacks[from].pop());
        solveStates.push(deepCopy(stacks));
    }
    if (moveN === 1) {
        moveOnePiece();
        return;
    }
    const tempDest = 3 - (from + to);
    solveHanoi(stacks, moveN - 1, from, tempDest, solveStates);
    moveOnePiece();
    solveHanoi(stacks, moveN - 1, tempDest, to, solveStates);
}

module.exports = hanoiDataStruct;
