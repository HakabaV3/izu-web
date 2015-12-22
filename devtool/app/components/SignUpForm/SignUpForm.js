import React, { Component } from 'react'
import AuthStore from 'store/AuthStore'

const State = {
    SLEEP: 'SLEEP',
    ACTIVE: 'ACTIVE',
    ERROR: 'ERROR'
};

export default class SignUpForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            password: '',
            state: AuthStore.state.isAuthorized ? State.AUTHORIZED : State.UNAUTHORIZED
        }
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

        AuthStore
            .pSignUp(this.state.name, this.state.password)
            .then(() => {
                this.setState({
                    state: State.SLEEP
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
            case State.SLEEP:
                state = '停止';
                break;

            case State.ACTIVE:
                state = '通信中';
                break;

            case State.ERROR:
                state = 'エラー';
                break;
        }

        return (
            <form
                className="dev SignInForm"
                onSubmit={(ev) => this._onFormSubmit(ev)}>
                <h3>サインアップ</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>状態</th>
                            <td>{state}</td>
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
