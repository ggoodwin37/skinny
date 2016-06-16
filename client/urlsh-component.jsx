var React = require('react');
var classNames = require('classnames');
var BackLinkComponent = require('./back-link-component.jsx');

const componentTitle = 'URL shortener frontend.';
const componentDescription = 'Going through API consumer flow for urlshortener api.';
var UrlshComponent = React.createClass({
    render: function() {
        return (
                <div className={classNames('s-component', 'urlsh-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <div className="urlsh-form">Coming soon.</div>
                    <BackLinkComponent />
                </div>
        );
    }
});

module.exports = {
    component: UrlshComponent,
    key: 'urlsh',
    title: componentTitle,
    descr: componentDescription
};
