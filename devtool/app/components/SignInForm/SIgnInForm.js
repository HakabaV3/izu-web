import React, { Component } from 'react'
import AuthStore from 'store/AuthStore'

const authStore = AuthStore.getStore();

const State = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    ACTIVE: 'ACTIVE',
    AUTHORIZED: 'AUTHORIZED',
    ERROR: 'ERROR'
};

export default class SignInForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            password: '',
            state: authStore.state.isAuthorized ? State.AUTHORIZED : State.UNAUTHORIZED
        }

        authStore.subscribe(() => {
            this.setState({
                updated: Date.now()
            })
        });
    }

    _onNameChange() {
        this.setState({
            name: this.refs.name.value
        });
    }

    _onPasswordChange() {
        this.setState({
            password: this.refs.password.value
        });
    }

    _onFormSubmit(ev) {
        this.setState({
            state: State.ACTIVE
        });

        authStore
            .pSignIn(this.state.name, this.state.password)
            .then(() => {
                this.setState({
                    state: State.AUTHORIZED
                })
            },
            (err) => {
                console.error(err);
                this.setState({
                    state: State.ERROR
                })
            });

        ev.preventDefault();
    }

    render() {
        let state;
        switch (this.state.state) {
            case State.UNAUTHORIZED:
                state = '認証なし';
                break;

            case State.ACTIVE:
                state = '通信中';
                break;

            case State.AUTHORIZED:
                state = '認証済み';
                break;

            case State.ERROR:
                state = 'エラー';
                break;
        }

        return (
            <form
                className="dev SignInForm"
                onSubmit={(ev) => this._onFormSubmit(ev)}>
                <h3>サインイン</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>状態</th>
                            <td>{state}</td>
                        </tr>
                        <tr>
                            <th>アカウント</th>
                            <td>{authStore.state.authorizedName}</td>
                        </tr>
                        <tr>
                            <th>トークン</th>
                            <td style={{
                                    display: 'block',
                                    maxWidth: '300px'
                                }}>
                                {authStore.state.token}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <input
                        type="text"
                        placeholder="text"
                        value={this.state.name}
                        ref="name"
                        onChange={() => this._onNameChange()}
                        />
                    <input
                        type="text"
                        placeholder="password"
                        value={this.state.password}
                        ref="password"
                        onChange={() => this._onPasswordChange()}
                        />
                    <input type="submit" />
                </p>
            </form>
        )
    }
}
