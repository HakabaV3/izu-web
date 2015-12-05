(function(kn) {
	var KNPagerItemState = {
		SLEEP: 'sleep',
		LOADING: 'loading',
		LOADED: 'loaded',
		ERROR: 'error'
	};
	kn.KNPagerItemState = KNPagerItemState;

	var KNPagerItemBehavior = {
		properties: {
			href: {
				type: String,
				reflectToAttribute: true,
				value: ''
			},
			key: {
				type: String,
				reflectToAttribute: true
			},
			state: {
				reflectToAttribute: true,
				value: KNPagerItemState.SLEEP,
				readOnly: true
			},
			loadingPromise: {
				type: Object,
				value: null
			}
		},
		pLoad: function(flagForceUpdate) {
			var href = this.href;

			if (!flagForceUpdate) {
				if (href === '' || this.state === KNPagerItemState.LOADED) {
					return Promise.resolve();
				} else if (this.state === KNPagerItemState.LOADING) {
					return this.loadingPromise;
				}
			}

			var page = this,
				promise = new Promise(function(resolve, reject) {
					page._setState(KNPagerItemState.LOADING);
					page.importHref(href, resolve, reject);
				})
				.then(_onload.bind(this));

			this.loadingPromise = promise;

			return promise;
		},
		onBeforeEnter: function() {
			if (this.state === KNPagerItemState.LOADED) {
				return Promise.resolve();
			} else {
				return this.pLoad();
			}
		},
		onEnter: function() {
			return Promise.resolve();
		},
		onAfterEnter: function() {
			return Promise.resolve();
		},
		onBeforeLeave: function() {
			return Promise.resolve();
		},
		onLeave: function() {
			return Promise.resolve();
		},
		onAfterLeave: function() {
			return Promise.resolve();
		},
		onload: function(doc) {
			console.warn('KNPagerItemBehavior.onload(doc) muse be overriden');
			console.warn(doc);
		},
		onerror: function(err) {
			console.warn('KNPagerItemBehavior.onload(err) muse be overriden');
			console.error(err);
		}
	};

	function _onload(ev) {
		this._setState(KNPagerItemState.LOADED);
		this.loadingPromise = null;
		this.onload(ev.target.import);
	}

	function _onerror(err) {
		this._setState(KNPagerItemState.ERROR);
		this.loadingPromise = null;
		this.onerror(err);
	}

	kn.KNPagerItemBehavior = [kn.KNSelectableBehavior, KNPagerItemBehavior];
})(self.kn || (self.kn = {}));
