function makeRandomArray(theCount) {
    var result = [];
    for (var i = 0; i < theCount; ++i) {
        result.push(Math.floor(Math.random() * 1000));
    }
    return result;
}

module.exports = makeRandomArray;
