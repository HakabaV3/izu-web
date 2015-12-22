import API from 'service/API'
import Store from 'store/Store'

export default new class extends Store {
	constructor() {
		super();

		let email = localStorage.getItem('n'),
			token = localStorage.getItem('t');

		if (!!email && !!token) {
			API.setToken(token);
			this.state = {
				isAuthorized: true,
				authorizedName: email,
				token: token
			};

		} else {
			this.state = {
				isAuthorized: false,
				authorizedName: '',
				token: null
			};
		}
	}

	/**
	 * サインインする
	 * @param  {string} name name
	 * @param  {string} password password
	 */
	pSignIn(name, password) {
		return API.pPost('/auth', {
				'name': name,
				'password': password
			})
			.then(data => {
				if (data.status !== 200) return Promise.reject(data.result);

				API.setToken(data.result.user.token);
				localStorage.setItem('n',data.result.user.name),
				localStorage.setItem('t',data.result.user.token);
				this.update({
					isAuthorized: true,
					authorizedName: data.result.user.name,
					token: data.result.user.token
				});

				return data.result.user;
			});
	}

	/**
	 * サインアップする
	 * @param  {string} name name
	 * @param  {string} password password
	 */
	pSignUp(name, password) {
		return API.pPost('/user', {
				'name': name,
				'password': password
			})
			.then(data => {
				if (data.status !== 200) return Promise.reject(data.result);

				API.setToken(data.result.user.token);
				localStorage.setItem('n',data.result.user.name),
				localStorage.setItem('t',data.result.user.token);
				this.update({
					isAuthorized: true,
					authorizedName: data.result.user.name,
					token: data.result.user.token
				});

				return data.result.user;
			});
	}

	/**
	 * サインアウトする
	 */
	signOut() {
		this.update({
			isAuthorized: false,
			authorizedName: '',
			token: null
		});
		localStorage.removeItem('n'),
		localStorage.removeItem('t');
		API.clearToken();
	}
}
