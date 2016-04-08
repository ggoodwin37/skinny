'use strict';

function trieNode(val) {
    this.val = val;
    this.children = {};
}
trieNode.prototype.insert = function(str, offs) {
    if (offs === str.length) {
        return;
    }

    const theChar = str[offs];
    if (!this.children[theChar]) {
        this.children[theChar] = new trieNode(theChar);
    }
    this.children[theChar].insert(str, offs + 1);
}

function trieDataStruct() {
    this.root = new trieNode(null);
}
trieDataStruct.prototype.insert = function(toInsert) {
    if (typeof toInsert === 'string') {
        toInsert = [toInsert];
    }
    console.assert(Array.isArray(toInsert));

    toInsert.forEach(function(oneWord) {
        this.insertWord(oneWord);
    }.bind(this));
}
trieDataStruct.prototype.insertWord = function(word) {
    this.root.insert(word.toLowerCase(), 0);
}
trieDataStruct.prototype.toString = function() {
    var words = [], stack = [];
    function recurse(node) {
        var childKeys = Object.keys(node.children).sort();
        // if we have no further children, the current word is complete.
        if (childKeys.length === 0) {
            words.push(stack.join(''));
            return;
        }
        childKeys.forEach(function(childKey) {
            var childNode = node.children[childKey];
            console.assert(childNode.val === childKey);  // TODO: can probably just get rid of .val
            stack.push(childNode.val);
            recurse(childNode);
            stack.pop();
        });
    }
    recurse(this.root);
    return words.join(',');
}

module.exports = trieDataStruct;
