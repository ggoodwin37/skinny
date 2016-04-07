var binTreeNode = function(val, leftChild, rightChild) {
    this.val = val;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
}

var binSortTree = function() {
    this.root = null;
}

function insertRecurse(newNode, testNode) {
    if (newNode.val < testNode.val) {
        if (!!testNode.leftChild) {
            insertRecurse(newNode, testNode.leftChild);
        } else {
            testNode.leftChild = newNode;
        }
    } else {
        if (!!testNode.rightChild) {
            insertRecurse(newNode, testNode.rightChild);
        } else {
            testNode.rightChild = newNode;
        }
    }
}

binSortTree.prototype.insert = function(val) {
    var newNode = new binTreeNode(val);
    if (!this.root) {
        this.root = newNode;
        return;
    }
    insertRecurse(newNode, this.root);
}

function inOrderRecurse(testNode, cb) {
    if (!!testNode.leftChild) {
        inOrderRecurse(testNode.leftChild, cb);
    }
    cb(testNode.val);
    if (!!testNode.rightChild) {
        inOrderRecurse(testNode.rightChild, cb);
    }
}

// cb gets called with val for each node in order
binSortTree.prototype.inOrder = function(cb) {
    if (this.root) {
        inOrderRecurse(this.root, cb);
    }
}

module.exports = {
    binTreeNode: binTreeNode,
    binSortTree: binSortTree
};
