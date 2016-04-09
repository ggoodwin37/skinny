var uuid = require('node-uuid');

function hanoiPiece(val) {
    this.val = val;
    this.id = uuid.v1();
}
function hanoiDataStruct() {
    this.stacks = [ [], [], [] ];
    for (var i = 7; i >= 1; i--) {
        this.stacks[0].push(new hanoiPiece(i));
    }
}

module.exports = hanoiDataStruct;
