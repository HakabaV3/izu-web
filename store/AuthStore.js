import Store from './Store';
import API from '../service/API';

export default class AuthStore extends Store {
    constructor() {
        super();
        this.state = {
            isAuthorized: false,
            authorizedName: '',
            token: '',
            isSignInFetching: false,
            lastSignInError: null,
            lastSignInErrorMessage: '',
            isSignUpFetching: false,
            lastSignUpError: null,
            lastSignUpErrorMessage: ''
        }
    }

    signIn(name, password) {
        this.update({
            isSignInFetching: true,
            lastSignInError: null,
            lastSignInErrorMessage: ''
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
                    isSignInFetching: false,
                    lastSignInError: null,
                    lastSignInErrorMessage: ''
                });
            } else {
                this.update({
                    isSignInFetching: false,
                    lastSignInError: data.result,
                    lastSignInErrorMessage: data.result.error
                });
            }
        })
        .catch(err => {
            this.update({
                isSignInFetching: false,
                lastSignInError: err,
                lastSignInErrorMessage: err.message
            });
        })
    }

    signUp(name, password, autoLogin=true) {
        this.update({
            isSignUpFetching: true,
            lastSignUpError: null,
            lastSignUpErrorMessage: ''
        });

        API.pPost('/user', {
            'name': name,
            'password': password
        })
        .then(data => {
            if (data.status === 200) {
                this.update({
                    isSignUpFetching: false,
                    lastSignUpError: null,
                    lastSignUpErrorMessage: ''
                });

                if (autoLogin) {
                    this.signIn(name, password);
                }
            } else {
                this.update({
                    isSignUpFetching: false,
                    lastSignUpError: data.result,
                    lastSignUpErrorMessage: data.result.error
                });
            }
        })
        .catch(err => {
            this.update({
                isSignUpFetching: false,
                lastSignUpError: err,
                lastSignUpErrorMessage: err.message
            });
        })
    }

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
