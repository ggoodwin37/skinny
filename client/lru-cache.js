
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
        newNode.prev = this.tail;
        newNode.next = null;
        this.tail.next = newNode;
        this.tail = newNode;
    }
    this.count++;
    return newNode;
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
    node.next.prev = node;
    this.head = node;
}
lruList.prototype.getCount = function() {
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
    if (this.nodeCache[key]) {
        this.nodeCache[key].val = val;
    } else {
        var newNode = this.list.add(key, val);
        this.nodeCache[key] = newNode;
    }
    this.freshen(key);
    this.checkSize();
}
lruCache.prototype.get = function(key) {
    var val = this.nodeCache[key];
    if (val !== undefined) {
        this.freshen(key);
    }
    return val;
}
lruCache.prototype.freshen = function(key) {
    var node = this.nodeCache[key];
    if (!node) {
        return;
    }
    this.list.freshen(node);
}
lruCache.prototype.checkSize = function() {
    var droppedNode;
    while (this.list.getCount() > this.maxItems) {
        droppedNode = this.list.dropBack();
        delete this.nodeCache[droppedNode.key];
    }
}
lruCache.prototype.toString = function() {
    var listEls = [];
    var node = this.list.head;
    while (node != null) {
        listEls.push(node.val);
        node = node.next;
    }
    var self = this;
    var nodeCacheEls = Object.keys(this.nodeCache).map(function(oneKey) {
        return self.nodeCache[oneKey].val;
    });
    return listEls.join(',');
}

module.exports = lruCache;
