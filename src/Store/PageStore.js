(function() {
	var ROUTE_LOGIN = {
			hash: '#/login',
			selected: 'login'
		},
		ROUTE_HOME = {
			hash: '#/home',
			selected: 'home'
		},
		ROUTE_MAP = [
			ROUTE_LOGIN,
			ROUTE_HOME, {
				hash: '#/report',
				selected: 'report'
			}, {
				hash: '',
				redirect: '#/home'
			}, {
				hash: '#/report/user/unique_user',
				selected: 'uniqueUser'
			}, {
				hash: '#/report/user/unique_visitor',
				selected: 'uniqueVisitor'
			}, {
				hash: '#/report/user/repeater',
				selected: 'repeater'
			}, {
				hash: '#/report/action/daily_congestion_rate',
				selected: 'dailyCongestionRate'
			}, {
				hash: '#/report/action/traffic_rate',
				selected: 'trafficRate'
			}, {
				hash: '#/report/action/moving_time',
				selected: 'movingTime'
			}, {
				hash: '#/report/action/staying_time',
				selected: 'stayingTime'
			}, {
				hash: '#/report/action/visit_count',
				selected: 'visitCount'
			}
		];

	var store = new Store({
			hash: null,
			selected: null,
			redirect: null
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

		var route = findRouteByHash(hash);
		if (route) {
			if (route.redirect) {
				state.selected = null;
				state.redirect = route.redirect;

			} else {
				state.selected = route.selected;
				state.redirect = null;
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
			state.redirect = ROUTE_HOME.hash;
			return true;
		}

		if (AuthStore.state.isLogined === false && state.selected !== ROUTE_LOGIN.selected) {
			state.selected = null;
			state.redirect = ROUTE_LOGIN.hash;
			return true;
		}

		return false;
	}

	function findRouteByHash(hash) {
		var i;
		for (i = 0; i < ROUTE_MAP.length; i++) {
			if (ROUTE_MAP[i].hash === hash) return ROUTE_MAP[i];
		}
		return null;
	}
})();
