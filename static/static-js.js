// just doing some raw js practice up in here

// really simple promise impl, no error support, not robust.
function promise() {
    this.numCompleted = 0;
    this.numRegistered = 0;
    this.execThen = null;
}
promise.prototype.when = function() {
    const funcs = Array.prototype.slice.call(arguments);
    funcs.forEach(thisFunc => {
        this.numRegistered++;
        thisFunc(() => {
            this.numCompleted++;
            if (this.numCompleted === this.numRegistered) {
                this._onDone();
            }
        });
    });
    return this;
}
promise.prototype.then = function(cb) {
    this.execThen = cb;
    return this;
}
promise.prototype._onDone = function() {
    this.execThen && this.execThen();
}

function baseClass() {
}
baseClass.prototype.toString = function() {
    return 'base';
}

function subClass() {
}
subClass.prototype = new baseClass();
// TODO: override, and/or with super

function setStatusText(str) {
    const el = document.querySelector('.status');
    el.innerText = str;
}

function fakeWork1(cb) {
    window.setTimeout(() => {
        setStatusText('fakeWork1 done');
        cb();
    }, 100);
}
function fakeWork2(cb) {
    window.setTimeout(() => {
        setStatusText('fakeWork2 done');
        cb();
    }, 200);
}
function fakeWork3(cb) {
    window.setTimeout(() => {
        cb();
    }, 300);
}

function testPromises(cb) {
    setStatusText('Waiting for fake work to complete...');
    var pr = new promise();
    pr.when(cb => {
        fakeWork1(cb);
    }, cb => {
        fakeWork2(cb);
    }, cb => {
        fakeWork3(cb);
    }).then(() => {
        setStatusText('Fake work is done!');
        cb();
    });
}

function testDomManipulation() {
    const parentEl = document.querySelector('.test-dom');
    for (let i = 0; i < 6; ++i) {
        let thisEl = document.createElement('div');
        thisEl.innerText = 'Test child ' + (i + 1);
        if (i === 3) {
            thisEl.className = 'special';
        }
        parentEl.appendChild(thisEl);
    }
}

function main() {
    testPromises(() => {
        testDomManipulation();
    });
}
