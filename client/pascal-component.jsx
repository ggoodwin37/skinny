var React = require('react');
var classNames = require('classnames');

var uuid = require('node-uuid');

var BackLinkComponent = require('./back-link-component.jsx');

// calculate this many rows
const maxRows = 24;

// return value is an array of rows of the triangle. Row 0 corresponds to the first row of the triangle ([1]) etc.
function generatePascalsTriangle() {
    var result = [];
    var iRow, iVal, leftVal, rightVal, thisRow;
    for (iRow = 0; iRow < maxRows; ++iRow) {
        // special case for first row
        if (iRow === 0) {
            result.push([1]);
            continue;
        }
        thisRow = [];
        for (iVal = 0; iVal <= iRow; ++iVal) {
            leftVal = (iVal === 0 ? 0 : result[iRow - 1][iVal - 1]);
            rightVal = (iVal === iRow ? 0 : result[iRow - 1][iVal]);
            thisRow.push(leftVal + rightVal);
        }
        result.push(thisRow);
    }
    return result;
}
var pascalCache = generatePascalsTriangle();

// note: apparently components need to be Capitalized? wtf.
var PascalRowComponent = React.createClass({
    render: function() {
        var valNodes = this.props.values.map(function(oneValue) {
            return (
                    <div className={classNames('pascal-val', {'odd-val': !!(oneValue % 2)})} key={uuid.v1()}>{oneValue}</div>
            );
        });
        return (
                <div className="pascal-row">
                    {valNodes}
                </div>
        );
    }
});

const componentTitle = 'This is the Pascal\'s triangle component.';
const componentDescription = 'Show Pascal\'s triangle, using flexbox, and highlight odd numbers to look for patterns.';
var PascalComponent = React.createClass({
    render: function() {
        var rowNodes = pascalCache.map(function(oneRow, i) {
            return (
                    <PascalRowComponent values={oneRow} key={uuid.v1()} />
            );
        });
        return (
                <div className={classNames('s-component', 'pascal-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <div className="results">
                        {rowNodes}
                    </div>
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: PascalComponent,
    key: 'pascal',
    title: componentTitle,
    descr: componentDescription
};
