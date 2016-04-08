
function lruListNode(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
}

function lruList() {
    this.head = null;
    this.tail = null;
    this.count = 0;
}
lruList.prototype.add = function(key, val) {
    var newNode = new lruListNode(key, val);
    if (this.tail === null) {
        this.head = this.tail = newNode;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
    this.count++;
}
lruList.prototype.freshen = function(node) {
    if (this.head === node) {
        return;
    }
    if (node.prev) {
        node.prev.next = node.next;
        if (this.tail === node) {
            this.tail = node.prev;
        }
    }
    if (node.next) {
        node.next.prev = node.prev;
    }
    node.prev = null;
    node.next = this.head;
    this.head = node;
}
lruList.prototype.count = function() {
    return this.count;
}
lruList.prototype.dropBack = function() {
    if (!this.tail) {
        return;
    }
    var dropped = this.tail;
    this.tail = this.tail.prev;
    if (this.tail) {
        this.tail.next = null;
    } else {
        this.head = null;
    }
    this.count--;
    dropped.prev = dropped.next = null;
    return dropped;
}

function lruCache(maxItems) {
    this.maxItems = maxItems;
    this.nodeCache = {};
    this.list = new lruList();
}
lruCache.prototype.set = function(key, val) {
    if (this.table[key]) {
        this.table[key].val = val;
    } else {
        var newNode = this.list.add(val);
        this.table[key] = newNode;
    }
    this.freshen(key);
    this.checkSize();
}
lruCache.prototype.get = function(key) {
    var val = this.table[key];
    if (val !== undefined) {
        this.freshen(key);
    }
    return val;
}
lruCache.prototype.freshen = function(key) {
    var node = this.table[key];
    if (!node) {
        return;
    }
    this.list.freshen(node);
}
lruCache.prototype.checkSize = function() {
    var droppedNode;
    while (this.list.count() > this.maxItems) {
        droppedNode = this.list.dropBack();
        delete this.table[droppedNode.key];
    }
}

module.exports = lruCache;
