var React = require('react');
var classNames = require('classnames');

var TrieNodeView = React.createClass({
    render: function() {
        var childKeys = Object.keys(this.props.node.children).sort();
        var childEls = childKeys.map(function(childKey) {
            var childNode = this.props.node.children[childKey];
            var highlight = null;
            if (this.props.highlight) {
                console.log('node view highlight exists', this.props.highlight);
                if (childKey === this.props.highlight.str[this.props.highlight.offs]) {
                    highlight = {
                        str: this.props.highlight.str,
                        offs: this.props.highlight.offs + 1
                    };
                }
            }
            var childClassNames = classNames('trie-view-node-group',
                                             {highlight: !!highlight,
                                              term: childNode.isTerminator});
            return (
                    <li className={childClassNames} key={childNode.id}>
                        <div className={classNames('trie-view-node-label')}>
                            {childKey.toUpperCase()}
                        </div>
                        <TrieNodeView node={childNode} highlight={highlight}/>
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
        var highlight = null;
        if (this.props.highlightWord) {
            highlight = {
                str: this.props.highlightWord,
                offs: 0
            }
        }
        return (
                <TrieNodeView node={this.props.trie.root} highlight={highlight} />
        );
    }
});

module.exports = TrieView;
