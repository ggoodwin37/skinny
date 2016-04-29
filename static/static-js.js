// just doing some raw js practice up in here

////////////////////////////////////////////////////////////////////////////////
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

// some fake async work to test out promises
function fakeWork(num, cb) {
    window.setTimeout(() => {
        setStatusText('fakeWork ' + num + ' done');
        cb();
    }, num * 300);
}

function testPromises(cb) {
    setStatusText('Waiting for fake work to complete...');
    var pr = new promise();
    pr.when(cb => {
        fakeWork(1, cb);
    }, cb => {
        fakeWork(2, cb);
    }, cb => {
        fakeWork(3, cb);
    }).then(() => {
        setStatusText('Fake work is done!');
        cb();
    });
}

////////////////////////////////////////////////////////////////////////////////
// simple prototypal inheritance
function baseThing() {
}
baseThing.prototype.createEl = function(isSpecial) {
    const el = document.createElement('div')
    el.className = this.getClassList(isSpecial).join(' ');
    return el;
}
baseThing.prototype.getClassList = function(isSpecial) {
    let classList = ['base-class'];
    if (isSpecial) {
        classList.push('special');
    }
    return classList;
}

subThing.prototype = new baseThing();
function subThing() {
}
subThing.prototype.super_getClassList = subThing.prototype.getClassList;
subThing.prototype.getClassList = function(isSpecial) {
    return [
        'sub-class'
    ].concat(this.super_getClassList(isSpecial));
}

function setStatusText(str) {
    const el = document.querySelector('.status');
    el.innerText = str;
}

function testDomManipulation() {
    const parentEl = document.querySelector('.test-dom');
    for (let i = 0; i < 6; ++i) {
        let thisThing = new subThing();
        let thisEl = thisThing.createEl(i === 3);
        thisEl.innerText = 'Test child ' + (i + 1);
        parentEl.appendChild(thisEl);
    }
}

////////////////////////////////////////////////////////////////////////////////

// simple event test. delegate events up to the container and toggle classes on the target el
function testEventShit() {
    const containerEl = document.querySelector('.test-dom');
    containerEl.addEventListener('click', ev => {
        const targetEl = ev.target;
        let classes = targetEl.className.split(' ');
        const specialIndex = classes.indexOf('special');
        if (specialIndex === -1) {
            classes.push('special');
        } else {
            classes.splice(specialIndex, 1);
        }
        targetEl.className = classes.join(' ');
    });
}

////////////////////////////////////////////////////////////////////////////////

function main() {
    testPromises(() => {
        testDomManipulation();
        testEventShit();
    });
}
