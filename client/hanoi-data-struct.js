var uuid = require('node-uuid');

function hanoiPiece(val) {
    this.val = val;
    this.id = uuid.v1();
}
function hanoiDataStruct(numPieces) {
    this.stacks = [ [], [], [] ];
    for (var i = numPieces; i >= 1; i--) {
        this.stacks[0].push(new hanoiPiece(i));
    }
    syncVersion(this.stacks, numPieces, 0, 2);
}
// ref impl
function syncVersion(stacks, moveN, from, to) {
    function moveOnePiece() {
        // sanity
        if (stacks[to].length > 0) {
            console.assert(stacks[to][stacks[to].length - 1].val > stacks[from][stacks[from].length - 1].val);
        }
        stacks[to].push(stacks[from].pop());
    }
    if (moveN === 1) {
        moveOnePiece();
        return;
    }
    const tempDest = 3 - (from + to);
    syncVersion(stacks, moveN - 1, from, tempDest);
    moveOnePiece();
    syncVersion(stacks, moveN - 1, tempDest, to);
}

module.exports = hanoiDataStruct;
