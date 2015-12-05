importScripts('/Store/idbStorage.js', '/service/tl-Http/Http.js');

(function() {
	var LOCALSTORAGE_AUTH_EMAIL = 'e',
		LOCALSTORAGE_AUTH_TOKEN = 't',
		LOCALSTORAGE_AUTH_EXPIRED = 'x',
		EXPIRED_FROM_LAST_REQUEST = 60 * 60 * 1000; //1hour

	var store = new Store({
			isLogined: null,
			isLoading: false,
			isError: false,
			inputEmail: '',
			inputPassword: '',
			loginedEmail: '',
			token: '',
			expired: null,
			errorMessage: ''
		}),
		state = store.state;


	store.on('login', function(params) {
			state.isError = false;
			state.isLoading = true;
			state.inputEmail = params.email;
			state.inputPassword = params.password;
			state.errorMessage = '';
			store.dispatch();

			pLogin();
		})
		.on('logout', function(params) {
			state.isError = false;
			state.isLogined = false;
			state.inputEmail = '';
			state.inputPassword = '';
			state.loginedEmail = '';
			state.token = '';
			state.errorMessage = '';

			pSaveState();
			store.dispatch();
		})
		.on('updateExpired', function(params) {
			updateExpired();
			store.dispatch();
		});

	function pLogin() {
		var inputEmail = state.inputEmail;

		return Http
			.pPostJSON('/login', {
				'email': state.inputEmail,
				'password': state.inputPassword
			})
			.then(function(data) {
				state.isLoading = false;
				state.isLogined = true;
				state.inputEmail = '';
				state.inputPassword = '';
				state.loginedEmail = inputEmail;
				state.token = data.token;
				state.errorMessage = '';

				updateExpired();
				pSaveState();
				store.dispatch();
			})
			.catch(function(err) {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = parseErrorType(err);
				store.dispatch();
			});
	};

	function parseErrorType(err) {
		var msg = 'Unknown Error'; //kn.i18n.getText('login.failed.unknown');

		if (err.status) {
			switch (err.status) {
				case 500:
					break;

				default:
					break;
			}
		}

		console.log(err);

		return msg;
	};

	function pLoadState() {
		Promise.all([
				idbStorage.getItem(LOCALSTORAGE_AUTH_TOKEN),
				idbStorage.getItem(LOCALSTORAGE_AUTH_EMAIL),
				idbStorage.getItem(LOCALSTORAGE_AUTH_EXPIRED)
			])
			.then(function(results) {
				var token = results[0],
					email = results[1],
					expired = results[2];

				if (!token || !email || !expired) {
					state.loginedEmail = '';
					state.token = '';
					state.expired = null;
					state.isLogined = false;

				} else if (expired < Date.now()) {
					state.loginedEmail = '';
					state.token = '';
					state.expired = null;
					state.isLogined = false;
					pSaveState();

				} else {
					state.loginedEmail = email;
					state.token = token;
					state.expired = expired;
					state.isLogined = true;
				}

				store.dispatch();
			});
	}

	function pSaveState() {
		if (state.isLogined) {
			idbStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, state.token);
			idbStorage.setItem(LOCALSTORAGE_AUTH_EMAIL, state.loginedEmail);
			idbStorage.setItem(LOCALSTORAGE_AUTH_EXPIRED, state.expired);

		} else {
			idbStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
			idbStorage.removeItem(LOCALSTORAGE_AUTH_EMAIL);
			idbStorage.removeItem(LOCALSTORAGE_AUTH_EXPIRED);
		}
	}

	function updateExpired() {
		state.expired = Date.now() + EXPIRED_FROM_LAST_REQUEST;
		pSaveState();
	};

	pLoadState();
})();
