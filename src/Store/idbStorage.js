(function() {
	if ('idbStorage' in self) return;

	(function() {
		var indexedDB = self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.msIndexedDB,
			IDBTransaction = self.IDBTransaction || self.webkitIDBTransaction || self.mozIDBTransaction || self.msIDBTransaction,
			IDBKeyRange = self.IDBKeyRange || self.webkitIDBKeyRange || self.mozIDBKeyRange || self.msIDBKeyRange,
			IDBCursor = self.IDBCursor || self.webkitIDBCursor;

		var request = indexedDB.open('idbStorage', 1),
			pInit = new Promise(function(resolve, reject) {
				request.onupgradeneeded = function(ev) {
					db = ev.target.result;

					var store = db.createObjectStore('store', {
						keyPath: 'key'
					});
					store.createIndex('value', 'value', {
						unique: false
					});
				};

				request.onerror = function(err) {
					console.log(error);
					console.error(err);
					reject();
				};

				request.onsuccess = function(event) {
					resolve(request.result);
				};
			});

		function getItem(key) {
			return pGetStore('store', 'readonly')
				.then(function(store) {
					return new Promise(function(resolve, reject) {
						var request = store.get(key);

						request.onsuccess = function() {
							resolve(request.result ? request.result.value : undefined);
						};
						request.onerror = function() {
							reject(request.error);
						};
					});
				});
		}

		function setItem(key, value) {
			return pGetStore('store', 'readwrite')
				.then(function(store) {
					return new Promise(function(resolve, reject) {
						var request = store.put({
							key: key,
							value: value
						});

						request.onsuccess = resolve();
						request.onerror = function() {
							reject(request.error);
						};
					});
				});
		}

		function removeItem(key) {
			return pGetStore('store', 'readwrite')
				.then(function(store) {
					return new Promise(function(resolve, reject) {
						var request = store.delete(key);

						request.onsuccess = resolve();
						request.onerror = function() {
							reject(request.error);
						};
					});
				});
		}

		function pGetStore(name, mode) {
			return pInit.then(function(db) {
				return db
					.transaction([name], mode)
					.objectStore(name);
			});
		}

		self.idbStorage = {
			getItem: getItem,
			setItem: setItem,
			removeItem: removeItem
		};
	})();
})();
