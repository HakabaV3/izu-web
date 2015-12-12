import 'whatwg-fetch'

const HEADER_KEY_TOKEN = 'X-Session-Token';
const HOST = 'http://izu.hakaba.xyz/api/v1';
// const HOST = 'http://localhost:3001/api/v1'; //DEBUG ONLY

function pipeRes2JSON(res) {
	return res.json();
}

function wrapWithHost(url) {
	if (url.substr(0, 4).toLowerCase() === 'http') return url;

	if (url.charAt(0) !== '/') {
		url = '/' + url;
	}

	return HOST + url
}

var token = null;

function fetchWithToken(url, opts) {
	if (token) {
		opts = opts || {};
		opts.headers = opts.headers ||{};
		opts.headers[HEADER_KEY_TOKEN] = token
	}

	return fetch(url, opts);
}


var API = {
	setToken: function(newToken) {
		token = newToken;
	},
	clearToken: function() {
		token = null;
	},
	pGet: function(url) {
		url = wrapWithHost(url);

		return fetchWithToken(url)
			.then(pipeRes2JSON);
	},
	pPost: function(url, body) {
		url = wrapWithHost(url);

		return fetchWithToken(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			.then(pipeRes2JSON);
	}
};

export default API

self.API = API;
