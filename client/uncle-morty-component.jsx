var React = require('react');
var classNames = require('classnames');

var BackLinkComponent = require('./back-link-component.jsx');
var LogOutput = require('./log-output-component.jsx');

const componentTitle = 'Uncle Morty problem.';
const componentDescription = 'Given a large series of number strings, return each that might be suitable for a lottery ticket pick. Note that a valid lottery ticket must have 7 unique numbers between 1 and 59, digits must be used in order, and every digit must be used.';
var MortyComponent = React.createClass({
    createDictionary: function() {
        var result = {};
        for (var i = 1; i <= 59; ++i) {
            result['' + i] = true;
        }
        return result;
    },
    execute: function() {
        const testValues = ['4938532894754', '1234567', '231416151718192', '1234561', '0000000', '12341324567', '10111213456', '1011121345',
                            '12342567', '1223425627', '1232425262', '615716583', '333444455'];
        var results = [];
        testValues.forEach(function(testValue) {
            // note: create a new dictionary each time because the algo consumes entries from the dict to satisfy uniqueness requirement.
            results.push(checkValue(testValue, this.createDictionary()));
        }.bind(this));
        return results;
    },
    render: function() {
        var initialLogMessages = this.execute();
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

const numNumbers = 7;
function checkValueRecurse(val, dict, resultStack) {
    if (val.length === 0) {
        return false;
    }
    if (val.length === 1) {
        if (resultStack.length === (numNumbers - 1) && dict[val]) {
            delete dict[val];
            resultStack.push(val);
            return true;
        }
        return false;
    }
    if (val.length === 2) {
        if (resultStack.length === (numNumbers - 1) && dict[val]) {
            delete dict[val];
            resultStack.push(val);
            return true;
        }
        var thisVal = val.substring(0, 1), remainder = val.substring(1);
        if (dict[thisVal]) {
            delete dict[thisVal];
            resultStack.push(thisVal);
            if (checkValueRecurse(remainder, dict, resultStack)) {
                return true;
            } else {
                dict[thisVal] = true;
                resultStack.pop();
                return false;
            }
        } else {
            return false;
        }
    }
    // try grabbing a two-char substring from the front
    var thisVal = val.substring(0, 2), remainder = val.substring(2);
    if (dict[thisVal]) {
        delete dict[thisVal];
        resultStack.push(thisVal);
        if (checkValueRecurse(remainder, dict, resultStack)) {
            return true;
        } else {
            dict[thisVal] = true;
            resultStack.pop();
        }
    }
    // didn't succeed, try a one-char substring instead
    thisVal = val.substring(0, 1);
    remainder = val.substring(1);
    if (dict[thisVal]) {
        delete dict[thisVal];
        resultStack.push(thisVal);
        if (checkValueRecurse(remainder, dict, resultStack)) {
            return true;
        } else {
            dict[thisVal] = true;
            resultStack.pop();
        }
    }
    return false;
}
function checkValue(val, dict) {
    var result = [];
    if (checkValueRecurse(val, dict, result)) {
        return 'Number string ' + val + ' can be broken down as: ' + result.join(' ');
    } else {
        return 'Number string ' + val + ' can\'t be broken down into ' + numNumbers + ' unique lotto numbers.';
    }
}

module.exports = {
    component: MortyComponent,
    key: 'uncle-morty',
    title: componentTitle,
    descr: componentDescription
};
