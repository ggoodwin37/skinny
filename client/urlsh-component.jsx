var React = require('react');
var classNames = require('classnames');
var BackLinkComponent = require('./back-link-component.jsx');

const componentTitle = 'URL shortener frontend.';
const componentDescription = 'Going through API consumer flow for urlshortener api.';
var UrlshComponent = React.createClass({
    render: function() {
        const self = this;
        function onSubmit(e) {
            e.preventDefault();
            if (self.urlInputRef) {
                const urlInput = self.urlInputRef.value;
                self.postUrl(urlInput);
            }
        }
        return (
                <div className={classNames('s-component', 'urlsh-component')}>
                    <h1 className="title">{componentTitle}</h1>
                    <div className="description">{componentDescription}</div>
                    <div className="urlsh-form">
                        <form onSubmit={onSubmit} >
                            <label>URL to shorten:</label>
                            <input type="text" id="url-input" ref={(urlInputRef) => { this.urlInputRef = urlInputRef }} />
                            <input type="submit" value="Shorten" />
                        </form>
                        <div className="status" ref={(statusRef) => { this.statusRef = statusRef }} ></div>
                    </div>
                    <BackLinkComponent />
                </div>
        );
    },
    postUrl: function(url) {
        // TODO: make this slicker, probably have a new component render when we get the result, etc.
        this.statusRef.innerText = "Waiting for API";
        window.setTimeout(() => {
            this.statusRef.innerText = "Result: " + url;  // TODO
        }, 5000);
    },
});

module.exports = {
    component: UrlshComponent,
    key: 'urlsh',
    title: componentTitle,
    descr: componentDescription
};
