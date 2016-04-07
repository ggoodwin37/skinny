const charSetAll = 'abcdefghijklmnopqrstuvwxyz'.split('');

function randomString(targetLength) {
    targetLength = targetLength || 4;
    var result = [], randomOffset, i;
    for (i = 0; i < targetLength; ++i) {
        randomOffset = Math.floor(Math.random() * charSet.length);
        result.push(charSet[randomOffset]);
    }
    return result.join('');
}

module.exports = randomString;
