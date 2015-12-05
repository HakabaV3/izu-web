(function(kn) {
	if ('Http' in self) return;

	(function() {
		self.Http = '';

		importScripts('/service/tl-Flux/Store.js');
		Store.add('/Store/AuthStore.js');

		var HEADER_KEY_ACCESSTOKEN = 'X-Session-Token';

		self.Http = {
			ENDPOINT: 'http://izu.hakaba.xyz/api/v1',
			HEADER_KEY_ACCESSTOKEN: HEADER_KEY_ACCESSTOKEN,

			pGet: function(url, params) {
				if (params) {
					url += '?' + this.encodeURLParam(params);
				}

				return this.pAjax({
					method: 'GET',
					headers: {},
					url: this.ENDPOINT + url
				});
			},
			pPost: function(url, params) {
				return this.pAjax({
					method: 'POST',
					url: this.ENDPOINT + url,
					headers: {},
					body: JSON.stringify(params)
				});
			},
			pPut: function(url, params) {
				return this.pAjax({
					method: 'PUT',
					url: this.ENDPOINT + url,
					headers: {},
					body: JSON.stringify(params)
				});
			},
			pGetJSON: function(url, params) {
				return this.pGet(url, params).then(pipeParseJSON());
			},
			pPostJSON: function(url, params) {
				return this.pPost(url, params).then(pipeParseJSON());
			},
			pPutJSON: function(url, params) {
				return this.pPut(url, params).then(pipeParseJSON());
			},
			pAjax: function(options) {
				return new Promise(function(resolve, reject) {
					var xhr = new XMLHttpRequest(),
						AuthStore = Store.get('/Store/AuthStore.js'),
						token = AuthStore ? AuthStore.state.token : '';

					xhr.open(options.method, options.url);
					xhr.onload = function() {
						if (xhr.status === 200) {
							resolve(xhr.responseText);
						} else {
							reject(xhr);
						}
					};
					xhr.onerror = reject;

					if (token) {
						xhr.setRequestHeader(HEADER_KEY_ACCESSTOKEN, token);
					}

					if (options.headers) {
						Object.keys(options.headers).forEach(function(key) {
							xhr.setRequestHeader(key, options.headers[key]);
						});
					}
					xhr.send(options.body);
				})
			},
			encodeURLParam: function(params) {
				return Object.keys(params)
					.map(function(key) {
						return key + '=' + encodeURIComponent(params[key]);
					})
					.join('&');
			}
		};

		function pipeParseJSON() {
			return function(text) {
				return JSON.parse(text);
			}
		}
	})();
})();
