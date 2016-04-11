// max heap
function heapDataStruct(initialData) {
    this.data = [];
    for (var i = 0; i < initialData.length; ++i) {
        this.insert(initialData[i]);
    }
}
heapDataStruct.prototype.duplicate = function() {
    return new heapDataStruct(this.data);
}
heapDataStruct.prototype.toString = function() {
    return this.data.join(', ');
}
heapDataStruct.prototype.insert = function(val) {
    this.data.push(val);
    this.siftUp(this.data.length - 1);
}
heapDataStruct.prototype.swap = function(index1, index2) {
    var temp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = temp;
}
heapDataStruct.prototype.siftUp = function(index) {
    if (index === 0) {
        return;
    }
    var parentIndex = (index % 2) ? ((index - 1) / 2) : ((index - 2) / 2);
    if (this.data[parentIndex] < this.data[index]) {
        this.swap(parentIndex, index);
        this.siftUp(parentIndex);
    }
}
// note: lengthToConsider might be less than this.data.length in the sort-in-place scenario
heapDataStruct.prototype.siftDown = function(index, lengthToConsider) {
    if (lengthToConsider <= 1) {
        return;
    }
    var leftChildIndex = (2 * index) + 1;
    var rightChildIndex = leftChildIndex + 1;
    const thisData = this.data[index], leftData = this.data[leftChildIndex], rightData = this.data[rightChildIndex];
    if (leftChildIndex >= lengthToConsider) {
        // special case: both children are past end of considerable list,
        // so we've sifted down as far as we can.
        return;
    }
    if (rightChildIndex >= lengthToConsider ) {
        // special case: right child is past end, but left is still within list,
        // so check if we need to sift to left child.
        if (this.data[index] < this.data[leftChildIndex]) {
            this.swap(index, leftChildIndex);
            this.siftDown(leftChildIndex, lengthToConsider);
        }
        return;
    }

    // normal case: both children are within list bounds
    // if only one is greater than this, swap with it.
    // if both are greater than this, swap with the greater of the two.
    if (thisData < leftData && thisData > rightData) {
        this.swap(index, leftChildIndex);
        this.siftDown(leftChildIndex, lengthToConsider);
    } else if (thisData < rightData && thisData > leftData) {
        this.swap(index, rightChildIndex);
        this.siftDown(rightChildIndex, lengthToConsider);
    } else if (thisData < leftData && thisData < rightData) {
        if (leftData > rightData) {
            this.swap(index, leftChildIndex);
            this.siftDown(leftChildIndex, lengthToConsider);
        } else {
            this.swap(index, rightChildIndex);
            this.siftDown(rightChildIndex, lengthToConsider);
        }
    } else {
        // do nothing, already sifted
    }
}
heapDataStruct.prototype.sortInPlace = function() {
    var considerLength;
    for (var i = 0; i < this.data.length; ++i) {
        considerLength = this.data.length - 1 - i;
        if (considerLength === 0) {
            return;
        }
        this.swap(0, considerLength);
        this.siftDown(0, considerLength);
    }
}

module.exports = heapDataStruct;
