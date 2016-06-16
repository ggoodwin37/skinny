var React = require('react');
var classNames = require('classnames');
var SimpleAjax = require('simple-ajax');

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
                        <form onSubmit={onSubmit} autoComplete="off">
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
        const apiKey = 'AIzaSyDEIbvw69tXpsOlhyOVTuILSjltioA9yVA';  // from dev console
        const shortenerUrl = 'https://www.googleapis.com/urlshortener/v1/url?key=' + apiKey;
        const postData = {
            longUrl: url
        };
        const ajax = new SimpleAjax({
            url: shortenerUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postData)
        });
        ajax.on('success', (event) => {
            const response = JSON.parse(event.target.response);
            const result = response.id;
            this.statusRef.innerText = "Result: " + result;
        });
        ajax.on('error', (event) => {
            console.log('error', event);
        });

        // TODO: make this slicker, probably have a new component render when we get the result, etc.
        this.statusRef.innerText = "Waiting for API";

        // fire
        ajax.send();
    },
});

module.exports = {
    component: UrlshComponent,
    key: 'urlsh',
    title: componentTitle,
    descr: componentDescription
};
