var React = require('react');
var classNames = require('classnames');

// temp
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
    'a',
    'I',
    'zilch'
];

var Trie1Component = React.createClass({
    testTrie: function() {
        var testTrie = new trieDataStruct();
        // for now, just insert a fixed list of words. Later we'll make this interactive.
        testTrie.insert(words);
        return testTrie;
    },
    render: function() {
        var testTrie = this.testTrie();
        var title = 'Trie.';
        var descr = 'Prefix tree.';
        var msgs = [testTrie.toString()];
        return (
                <div className={classNames('s-component', 'trie1-component')}>
                    <h1 className="title">{title}</h1>
                    <div className="description">{descr}</div>
                    <TrieView trie={testTrie} />
                    <LogOutput initialMessages={msgs} />
                <BackLinkComponent />
                </div>
        );
    }
});

module.exports = Trie1Component;