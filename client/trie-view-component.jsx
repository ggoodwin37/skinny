var React = require('react');
var classNames = require('classnames');

var TrieNodeView = React.createClass({
    render: function() {
        // TODO: support highlighting of a current word.
        var childKeys = Object.keys(this.props.node.children).sort();
        var childEls = childKeys.map(function(childKey) {
            var childNode = this.props.node.children[childKey];
            return (
                    <li className={classNames('trie-view-node-group')} key={childNode.id}>
                        <div className={classNames('trie-view-node-label')}>
                            {childKey.toUpperCase()}
                        </div>
                        <TrieNodeView node={childNode} />
                    </li>
            );
        }.bind(this));
        return (
                <ul className={classNames('trie-view-node')}>
                    {childEls}
                </ul>
        );
    }
});


var TrieView = React.createClass({
    render: function() {
        return (
                <TrieNodeView node={this.props.trie.root} />
        );
    }
});

module.exports = TrieView;
