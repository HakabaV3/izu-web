import './LoginPage.scss'

import React, { Component } from 'react'
import classNames from 'classnames'

import Input from 'components/Input/Input'

import AuthStore from 'store/AuthStore'

const State = {
    SIGN_IN: 0,
    TO_SIGN_UP: 1,
    SIGN_UP: 2,
    TO_SIGN_IN: 3,
}
export default class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            isActive: false,
            username: '',
            password: '',
            state: State.SIGN_IN
        };
    }

    _onSubmit(ev) {
        ev.preventDefault();
		this.setState({
			isActive: true
		});

		AuthStore.pSignIn(this.refs.username.value, this.refs.password.value)
			.then(d => {
				this.setState({
					isActive: false
				});
			})
			.catch(e => {
				console.log(e);
				this.setState({
					isActive: false
				});
			})
	}

    _onShowSignInFormButtonClick(ev) {
        ev.preventDefault();
        this.setState({
            state: State.TO_SIGN_UP
        });

        setTimeout(() => {
            this.setState({
                state: State.SIGN_UP
            });
        }, 400);
    }

    render() {
        return (<div className={classNames({
            'LoginPage': true,
            'is-active': this.state.isActive,
            'is-to-signUp': this.state.state === State.TO_SIGN_UP,
            'is-signUp': this.state.state === State.SIGN_UP,
            'is-to-signIn': this.state.state === State.TO_SIGN_IN
        })}>
            <div className="LoginPage__base">
                <form className="LoginPage__SignInForm"
                    disabled={this.state.isActive}
                    onSubmit={ev => this._onSubmit(ev)}>
                    <div className="LoginPage__row">
                        <Input
                            disabled={this.state.isActive}
                            value={this.state.username}
                            type="text"
                            label="username"
                            ref="username" />
                    </div>
                    <div className="LoginPage__row">
                        <Input
                            disabled={this.state.isActive}
                            value={this.state.password}
                            type="password"
                            label="password"
                            ref="password" />
                    </div>
                    <div className="LoginPage__row">
                        <button className="LoginPage__submit"
                            disabled={this.state.isActive}
                            type="submit">
                            <span className="LoginPage__submit__text">ログイン</span>
                                <svg className="LoginPage__submit__loading"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    height="24"
                                    width="24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        fill="none"
                                        strokeWidth="2"
                                        strokeDasharray="41.88790204786391 20.943951023931955" />
                                </svg>
                        </button>
                    </div>
                    <div className="LoginPage__row">
                        <button className="LoginPage__ShowSignInFormButton"
                            disabled={this.state.isActive}
                            onClick={ev => this._onShowSignInFormButtonClick(ev)}
                            type="submit">
                            <span className="LoginPage__ShowSignInFormButton__text">アカウントをお持ちでない場合</span>
                        </button>
                    </div>
                </form>
                <form className="LoginPage__SignUpForm"
                    disabled={this.state.isActive}
                    onSubmit={ev => this._onSubmit(ev)}>
                    <div className="LoginPage__row">
                        <Input
                            disabled={this.state.isActive}
                            value={this.state.username}
                            type="text"
                            label="username"
                            ref="username2" />
                    </div>
                    <div className="LoginPage__row">
                        <Input
                            disabled={this.state.isActive}
                            value={this.state.password}
                            type="password"
                            label="password"
                            ref="password2" />
                    </div>
                    <div className="LoginPage__row">
                        <button className="LoginPage__submit"
                            disabled={this.state.isActive}
                            type="submit">
                            <span className="LoginPage__submit__text">ログイン</span>
                                <svg className="LoginPage__submit__loading"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    height="24"
                                    width="24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        fill="none"
                                        strokeWidth="2"
                                        strokeDasharray="41.88790204786391 20.943951023931955" />
                                </svg>
                        </button>
                    </div>
                    <div className="LoginPage__row">
                        <button className="LoginPage__ShowSignInFormButton"
                            disabled={this.state.isActive}
                            onClick={ev => this._onShowSignInFormButtonClick(ev)}
                            type="submit">
                            <span className="LoginPage__ShowSignInFormButton__text">アカウントをすでにお持ちの場合</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>)
    }
}
