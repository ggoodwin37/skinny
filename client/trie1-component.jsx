var React = require('react');
var classNames = require('classnames');

var LogOutput = require('./log-output-component.jsx');
var TrieView = require('./trie-view-component.jsx');
var BackLinkComponent = require('./back-link-component.jsx');

var trieDataStruct = require('./trie-data-struct');
var words = [
    'car',
    'craft',
    'crater',
    'cat',
    'dog',
    'do',
    'damn',
    'damage',
    'damaged',
    'critter',
    'cathedral',
    'burrito',
    'burr',
    'fish',
    'fix',
    'fin',
    'final',
    'alter',
    'alien',
    'extreme',
    'extraordinary',
    'a',
    'I',
    'zilch'
];

const componentTitle = 'Trie.';
const componentDescription = 'Prefix tree. Red boxes are word terminations.';
var Trie1Component = React.createClass({
    testTrie: function() {
        var testTrie = new trieDataStruct();
        // for now, just insert a fixed list of words. Later we could make this interactive.
        testTrie.insert(words);
        return testTrie;
    },
    render: function() {
        var highlightWord = 'extreme';
        var testTrie = this.testTrie();
        var msgs = [testTrie.toString()];
        return (
                <div className={classNames('s-component', 'trie1-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription + ' Highlighting the word "' + highlightWord + '".'}</div>
                    <TrieView trie={testTrie} highlightWord={highlightWord} />
                    <LogOutput initialMessages={msgs} />
                <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: Trie1Component,
    key: 'trie1',
    title: componentTitle,
    descr: componentDescription
};
