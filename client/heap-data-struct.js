// max heap
function heapDataStruct(initialData) {
    this.data = [];
    for (var i = 0; i < initialData.length; ++i) {
        this.insert(initialData[i]);
    }
}
heapDataStruct.prototype.insert = function(val) {
    this.data.push(initialData[i]);
    this.shiftUp(this.data.length - 1);
}
heapDataStruct.prototype.shiftUp = function(index) {
    if (index === 0) {
        return;
    }
    var parentIndex = (index % 2) ? ((index - 1) / 2) : ((index - 2) / 2);
    if (this.data[parentIndex] < this.data[index]) {
        var temp = this.data[parentIndex];
        this.data[parentIndex] = this.data[index];
        this.data[index] = temp;
        this.shiftUp(parentIndex);
    }
}

module.exports = heapDataStruct;
