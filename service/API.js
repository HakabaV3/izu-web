import 'whatwg-fetch'

const HEADER_KEY_TOKEN = 'X-Session-Token';
const HOST = 'http://izu.hakaba.xyz/api/v1';
// const HOST = 'http://localhost:3001/api/v1'; //DEBUG ONLY

function pipeRes2JSON(res) {
	return res.json();
}

var token = null;

var API = {
	fetchWithToken: function(url, opts) {
		if (token) {
			opts = opts || {};
			opts.headers = opts.headers || {};
			opts.headers[HEADER_KEY_TOKEN] = token
		}

		return fetch(url, opts);
	},
	setToken: function(newToken) {
		token = newToken;
	},
	clearToken: function() {
		token = null;
	},
	wrapWithHost: function(url) {
		if (url.substr(0, 4).toLowerCase() === 'http') return url;

		if (url.charAt(0) !== '/') {
			url = '/' + url;
		}

		return HOST + url
	},
	pGet: function(url) {
		url = API.wrapWithHost(url);

		return API.fetchWithToken(url)
			.then(pipeRes2JSON);
	},
	pPost: function(url, body) {
		url = API.wrapWithHost(url);

		return API.fetchWithToken(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			.then(pipeRes2JSON);
	},
	pPatch: function(url, body) {
		url = API.wrapWithHost(url);

		return API.fetchWithToken(url, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			.then(pipeRes2JSON);
	},
	pDelete: function(url) {
		url = API.wrapWithHost(url);

		return API.fetchWithToken(url, {
				method: 'DELETE'
			})
			.then(pipeRes2JSON);
	}
};

export default API

self.API = API;
