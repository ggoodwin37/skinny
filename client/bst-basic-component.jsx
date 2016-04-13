var React = require('react');
var classNames = require('classnames');

var BackLinkComponent = require('./back-link-component.jsx');
var LogOutput = require('./log-output-component.jsx');
var randomString = require('./random-string');

var binSortTree = require('./bin-tree').binSortTree;

const componentTitle = 'Basic binary-sort-tree.';
const componentDescription = 'BST insert and in-order traversal.';

var BstBasicComponent = React.createClass({
    testBst: function() {
        const numEntries = 17;
        var msgs = [], inserted = [], i, str;
        var tree = new binSortTree();
        for (i = 0; i < numEntries; ++i) {
            str = randomString();
            tree.insert(str);
            inserted.push(str);
        }
        msgs.push('Inserted ' + numEntries + ' strings into bst: ' + inserted.join(','));

        var traversed = [];
        tree.inOrder((val) => {
            traversed.push(val);
        });
        msgs.push('In-order traversal of bst is: ' + traversed.join(','));
        msgs.push('Length of in-order traversal is: ' + traversed.length);
        return msgs;
    },
    render: function() {
        var initialLogMessages = this.testBst();
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

module.exports = {
    component: BstBasicComponent,
    key: 'bst-basic',
    title: componentTitle,
    descr: componentDescription
};
