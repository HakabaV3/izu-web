importScripts('/Store/idbStorage.js', '/service/tl-Http/Http.js');

(function() {
	var LOCALSTORAGE_AUTH_TOKEN = 't',
		LOCALSTORAGE_AUTH_USERNAME = 'n',
		LOCALSTORAGE_AUTH_USERID = 'i';

	var store = new Store({
			isLogined: null,
			isLoading: false,
			isError: false,
			inputUsername: '',
			inputPassword: '',
			loginedUsername: '',
			loginedUserId: '',
			token: '',
			errorMessage: ''
		}),
		state = store.state;


	store.on('login', function(params) {
			state.isLoading = true;
			state.isError = false;
			state.inputUsername = params.username;
			state.inputPassword = params.password;
			state.errorMessage = '';
			store.dispatch();

			pLogin();
		})
		.on('logout', function(params) {
			state.isLogined = false;
			state.isError = false;
			state.inputUsername = '';
			state.inputPassword = '';
			state.loginedEmail = '';
			state.loginedUserId = '';
			state.token = '';
			state.errorMessage = '';

			pSaveState();
			store.dispatch();
		});

	function pLogin() {
		var inputEmail = state.inputEmail;

		return Http
			.pPostJSON('/api/v1/auth', {
				'username': state.inputUsername,
				'password': state.inputPassword
			})
			.then(function(data) {
				if (data.status !== Http.STATUS_OK) throw data;

				state.isLoading = false;
				state.isLogined = true;
				state.inputUsername = '';
				state.inputPassword = '';
				state.loginedUsername = data.result.name;
				state.loginedUserId = data.result.id;
				state.token = data.result.token;
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
				idbStorage.getItem(LOCALSTORAGE_AUTH_USERNAME),
				idbStorage.getItem(LOCALSTORAGE_AUTH_USERID)
			])
			.then(function(results) {
				var token = results[0],
					email = results[1],
					expired = results[2];

				// if (!token || !email || !expired) {
				// 	state.loginedUserId = '';
				// 	state.loginedUsername = '';
				// 	state.token = '';
				// 	state.isLogined = false;
				//
				// } else if (expired < Date.now()) {
				// 	state.loginedUserId = '';
				// 	state.loginedUsername = '';
				// 	state.token = '';
				// 	state.isLogined = false;
				// 	pSaveState();
				//
				// } else {
				// 	state.loginedUserId = username;
				// 	state.loginedUsername = '';
				// 	state.token = token;
				// 	state.isLogined = true;
				// }

				state.loginedUserId = '00dummy00';
				state.loginedUsername = '(dummy login)';
				state.token = '01234567890';
				state.isLogined = true;

				store.dispatch();
			});
	}

	function pSaveState() {
		if (state.isLogined) {
			idbStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, state.token);
			idbStorage.setItem(LOCALSTORAGE_AUTH_USERNAME, state.loginedUsername);
			idbStorage.setItem(LOCALSTORAGE_AUTH_USERID, state.loginedUserId);

		} else {
			idbStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
			idbStorage.removeItem(LOCALSTORAGE_AUTH_USERNAME);
			idbStorage.removeItem(LOCALSTORAGE_AUTH_USERID);
		}
	}

	pLoadState();
})();
