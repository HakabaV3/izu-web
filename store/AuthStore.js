import Store from './Store';
import API from '../service/API';
import APIState from './structure/APIState';

export default class AuthStore extends Store {
    constructor() {
        super();
        this.state = {
            isAuthorized: false,
            authorizedName: '',
            token: '',
            signInState: APIState(),
            signUpState: APIState()
        }
    }

    /**
     * サインインする
     * @param  {string} name name
     * @param  {string} password password
     */
    signIn(name, password) {
        this.update({
            signInState: APIState({
                isActive: true
            })
        });

        API.pPost('/auth', {
            'name': name,
            'password': password
        })
        .then(data => {
            if (data.status === 200) {
                this.update({
                    isAuthorized: true,
                    authorizedName: data.result.user.name,
                    token: data.result.user.token,
                    signInState: APIState()
                });
            } else {
                this.update({
                    signInState: APIState({
                        error: data.result,
                        errorMessage: data.result.error
                    })
                });
            }
        })
        .catch(err => {
            signInState: APIState({
                error: err,
                errorMessage: err.message
            })
        })
    }

    /**
     * サインアップする
     * @param  {string} name name
     * @param  {string} password password
     * @param  {bool} [autoLogin=true] サインアップに成功した場合、自動的にログインするか
     */
    signUp(name, password, autoLogin=true) {
        this.update({
            signUpState: APIState({
                isActive: true
            })
        });

        API.pPost('/user', {
            'name': name,
            'password': password
        })
        .then(data => {
            if (data.status === 200) {
                this.update({
                    signUpState: APIState()
                });

                if (autoLogin) {
                    this.signIn(name, password);
                }
            } else {
                this.update({
                    signUpState: APIState({
                        error: data.result,
                        errorMessage: data.result.error
                    })
                });
            }
        })
        .catch(err => {
            this.update({
                signUpState: APIState({
                    error: err,
                    errorMessage: err.message
                })
            });
        })
    }

    /**
     * サインアウトする
     */
    signOut() {
        this.update({
            isAuthorized: false,
            token: null
        });
        API.clearToken();
    }
}

AuthStore.getStore()
    .subscribe(function(store){
        API.setToken(store.state.token);
    });
