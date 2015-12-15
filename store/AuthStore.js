import Store from './Store';
import API from '../service/API';

export default class AuthStore extends Store {
	constructor() {
		super();
		this.state = {
			isAuthorized: false,
			authorizedName: '',
			token: null
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

				this.update({
					isAuthorized: true,
					authorizedName: data.result.user.name,
					token: data.result.user.token
				});
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

				this.update({
					isAuthorized: true,
					authorizedName: data.result.user.name,
					token: data.result.user.token
				});
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
		API.clearToken();
	}
}

AuthStore.getStore()
	.subscribe(function(store) {
		API.setToken(store.state.token);
	});
