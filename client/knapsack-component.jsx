var React = require('react');
var classNames = require('classnames');

var BackLinkComponent = require('./back-link-component.jsx');
var LogOutput = require('./log-output-component.jsx');

const componentTitle = 'Knapsack problem';
const componentDescription = 'A variation of the knapsack problem, where we are trying to maximize E while not going over MAX_L.';
var KnapsackComponent = React.createClass({
    dataToString: function(data) {
        return data.map(data => { return '' + data.e + '(' + data.l + ')'; }).join(' ');
    },
    testOneBruteForce: function(input, maxL) {
        return 'Brute force output: ' + this.dataToString(solveBruteForce(input, maxL));
    },
    testAll: function() {
        const maxL = 10;
        const testCases = [
            [{e: 1, l: 3}, {e: 2, l: 3}, {e: 3, l: 3}, {e: 4, l: 3}, {e: 5, l: 3}, {e: 6, l: 3}],
            [{e: 10, l: 10}, {e: 3, l: 2}, {e: 3, l: 2}, {e: 3, l: 2}, {e: 3, l: 2}, {e: 3, l: 2}],
            [{e: 8, l: 2}, {e: 3, l: 5}, {e: 2, l: 6}, {e: 4, l: 3}, {e: 5, l: 2}, {e: 3, l: 3}],
        ];
        var msgs = [];
        testCases.forEach(thisCase => {
            msgs.push('Input: ' + this.dataToString(thisCase) + ' max=' + maxL);
            msgs.push(this.testOneBruteForce(thisCase, maxL));
            msgs.push('------');
        });
        return msgs;
    },
    render: function() {
        var initialLogMessages = this.testAll();
        return (
                <div className={classNames('s-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <LogOutput initialMessages={initialLogMessages} ref={(loggerRef) => { this.logger = loggerRef }} />
                    <BackLinkComponent />
                </div>
        );
    }
});

// brute force approach: cover every possible combo
function solveBruteForce(input, maxL) {
    function isWithinLimit(combo) {
        var sum = input.reduce((p, c, i) => {
            if (!!(combo & (1 << i))) {
                return p + c.l;
            } else {
                return p;
            }
        }, 0);
        return sum <= maxL;
    }
    function calcScore(combo) {
        return input.reduce((p, c, i) => {
            if (!!(combo & (1 << i))) {
                return p + c.e;
            } else {
                return p;
            }
        }, 0);
    }
    var bestScore = 0, bestCombo = null;;
    const max = Math.pow(2, input.length);
    for (var i = 0; i < max; ++i) {
        if (isWithinLimit(i)) {
            const score = calcScore(i);
            if (score > bestScore) {
                bestScore = score;
                bestCombo = i;
            }
        }
    }
    if (bestCombo === null) {
        return [];
    }
    return input.filter((el, index) => {
        return !!(bestCombo & (1 << index));
    });
}

module.exports = {
    component: KnapsackComponent,
    key: 'knapsack',
    title: componentTitle,
    descr: componentDescription
};
