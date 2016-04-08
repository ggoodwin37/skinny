'use strict';

var uuid = require('node-uuid');

function trieNode() {
    this.isTerminator = false;
    this.children = {};
    this.id = uuid.v1();
}
trieNode.prototype.insert = function(str, offs) {
    if (offs === str.length) {
        // mark that a word ended at this node.
        this.isTerminator = true;
        return;
    }

    const theChar = str[offs];
    if (!this.children[theChar]) {
        this.children[theChar] = new trieNode();
    }
    this.children[theChar].insert(str, offs + 1);
}

function trieDataStruct() {
    this.root = new trieNode();
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
        // if this node marked the end of the word, store the current word.
        // we need to continue recursing even if this was a word stop.
        if (node.isTerminator) {
            words.push(stack.join(''));
        }

        var childKeys = Object.keys(node.children).sort();
        childKeys.forEach(function(childKey) {
            var childNode = node.children[childKey];
            stack.push(childKey);
            recurse(childNode);
            stack.pop();
        });
    }
    recurse(this.root);
    return words.join(',');
}

module.exports = trieDataStruct;
