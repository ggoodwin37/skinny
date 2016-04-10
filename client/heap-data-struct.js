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
    return this.data.join(',');
}
heapDataStruct.prototype.insert = function(val) {
    this.data.push(val);
    this.shiftUp(this.data.length - 1);
}
heapDataStruct.prototype.swap = function(index1, index2) {
    var temp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = temp;
}
heapDataStruct.prototype.shiftUp = function(index) {
    if (index === 0) {
        return;
    }
    var parentIndex = (index % 2) ? ((index - 1) / 2) : ((index - 2) / 2);
    if (this.data[parentIndex] < this.data[index]) {
        this.swap(parentIndex, index);
        this.shiftUp(parentIndex);
    }
}
// note: lengthToConsider might be less than this.data.length in the sort-in-place scenario
heapDataStruct.prototype.shiftDown = function(index, lengthToConsider) {
    var leftChildIndex = (2 * index) + 1;
    var rightChildIndex = leftChildIndex + 1;
    if (rightChildIndex < lengthToConsider && this.data[index] < this.data[rightChildIndex]) {
        this.swap(index, rightChildIndex);
        this.shiftDown(rightChildIndex, lengthToConsider);
        return;
    }
    if (leftChildIndex < lengthToConsider && this.data[index] < this.data[leftChildIndex]) {
        this.swap(index, leftChildIndex);
        this.shiftDown(leftChildIndex, lengthToConsider);
        return;
    }
}
heapDataStruct.prototype.sortInPlace = function() {
    var considerLength;
    for (var i = 0; i < this.data.length; ++i) {
        considerLength = this.data.length - 1 - i;
        this.swap(0, considerLength);
        this.shiftDown(0, considerLength);
    }
}

module.exports = heapDataStruct;
