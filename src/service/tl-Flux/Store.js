(function() {
	'use strict';

	if ('Store' in self) return;

	(function() {

		var storeMap = new Map(),
			actionListenerMap = new Map();

		var Store = function(state) {
			var scriptUrl = Store.preserveScriptUrl;
			Store.preserveScriptUrl = null;

			if (!scriptUrl) {
				throw new Error('Illegal Store Construction.');
			}

			storeMap.set(scriptUrl, this);

			this.scriptUrl = scriptUrl;
			this.state = state || {};
			this.handlers = [];

			this.dispatch();
		};

		addEventListener('message', function(ev) {
			var data = ev.data;
			switch (data.type) {
				case 'action':
					Store.dispatchAction(data.action, data.data);
					break;

				case 'store_add':
					Store.add(data.scriptUrl);
					break;
			}
		});

		Store.add = function(scriptUrl) {
			if (storeMap.has(scriptUrl)) return;
			storeMap.set(scriptUrl, null);

			Store.preserveScriptUrl = scriptUrl;
			importScripts(scriptUrl);
		};

		Store.get = function(scriptUrl) {
			return storeMap.get(scriptUrl);
		};

		Store.dispatchAction = function(action, data) {
			var listeners = actionListenerMap.get(action);
			if (!listeners) return;

			listeners.forEach(function(listener) {
				listener(data);
			});
		};

		Store.prototype.on = function(action, handler) {
			var listeners = actionListenerMap.get(action);
			if (!listeners) {
				listeners = [];
				actionListenerMap.set(action, listeners);
			}

			listeners.push(handler);

			return this;
		};

		Store.prototype.dispatch = function() {
			var state = this.state;

			this.handlers.forEach(function(handler) {
				handler(state);
			});

			postMessage({
				scriptUrl: this.scriptUrl,
				state: state
			});

			return this;
		};

		Store.prototype.addListener = function(handler) {
			this.handlers.push(handler);
		};

		self.Store = Store;
	})();
})();
