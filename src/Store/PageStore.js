(function() {
	var ROUTE_LOGIN = {
			hash: '#/login',
			selected: 'login'
		},
		ROUTE_HOME = {
			hash: '^#/home$',
			selected: 'home',
			title: 'ホーム'
		},
		ROUTE_MAP = [
			ROUTE_LOGIN,
			ROUTE_HOME, {
				hash: '^#?/?$',
				redirect: '#/home'
			}, {
				hash: '^#/user/([^/*])$',
				selected: 'user',
				title: ''
			}, {
				hash: '^#/photo/([^/*])$',
				selected: 'photo',
				title: ''
			}, {
				hash: '^#/plan/([^/*])$',
				selected: 'plan',
				title: ''
			}, {
				hash: '^#/photos$',
				selected: 'photos',
				title: '投稿した写真一覧'
			}, {
				hash: '^#/plans$',
				selected: 'plans',
				title: '投稿したプラン一覧'
			}
		];

	ROUTE_MAP.forEach(function(route) {
		route.hash = new RegExp(route.hash);
	});

	var store = new Store({
			hash: null,
			selected: null,
			redirect: null,
			title: null,
			match: null
		}),
		state = store.state;

	var AuthStore = Store.get('/Store/AuthStore.js')

	AuthStore.addListener(function() {
		if (checkIsLoginRequired()) {
			store.dispatch();
		}
	});

	store.on('hashchange', function(hash) {
		resolveRoute(hash);
	});

	function resolveRoute(hash) {
		state.hash = hash;

		var res = findRouteByHash(hash);

		if (res) {
			if (res.route.redirect) {
				state.selected = null;
				state.redirect = res.route.redirect;
				state.match = res.match;

			} else {
				state.selected = res.route.selected;
				state.redirect = null;
				state.match = res.match;
				state.title = res.route.title;
			}

		} else {
			state.selected = null;
			state.redirected = null;
		}

		checkIsLoginRequired();
		store.dispatch();
	}

	function checkIsLoginRequired() {
		if (AuthStore.state.isLogined !== false && state.selected === ROUTE_LOGIN.selected) {
			state.selected = null;
			state.redirect = '#/home';
			return true;
		}

		if (AuthStore.state.isLogined === false && state.selected !== ROUTE_LOGIN.selected) {
			state.selected = null;
			state.redirect = '#/login';
			return true;
		}

		return false;
	}

	function findRouteByHash(hash) {
		var i, ma;
		for (i = 0; i < ROUTE_MAP.length; i++) {
			if (ma = hash.match(ROUTE_MAP[i].hash)) {
				return {
					route: ROUTE_MAP[i],
					match: ma
				};
			}
		}

		return null;
	}
})();
