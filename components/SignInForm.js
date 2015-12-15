import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import React, { Component, PropTypes } from 'react';

export default class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            password: '',
        }
    }

    _onNameChange(ev) {
        this.setState({
            name: ev.target.value
        });
    }

    _onPasswordChange(ev) {
        this.setState({
            password: ev.target.value
        });
    }

    _onSubmit(ev) {
        this.props.onSubmit(this.state.name, this.state.password);

        ev.preventDefault();
    }

	render() {
		return (
            <form
                // style={{
                //     display: 'inline-block',
                //     border: '1px solid #000',
                //     padding: '16px',
                //     margin: '16px'
                // }}
                disabled={this.props.disabled}
                method="POST"
                action="#"
                onSubmit={(ev) => this._onSubmit(ev)}>
                <div>
                    <span style={{color: '#f00'}}>{this.props.errorMessage}</span>
                </div>
                <div>
                    <TextField
                        ref="nameInput"
                        floatingLabelText="ユーザー名"
                        value={this.state.name}
                        disabled={this.props.disabled}
                        onChange={(ev) => this._onNameChange(ev)} />
                </div>
                <div>
                    <TextField
                        ref="passwordInput"
                        type="password"
                        floatingLabelText="パスワード"
                        value={this.state.password}
                        disabled={this.props.disabled}
                        onChange={(ev) => this._onPasswordChange(ev)} />
                </div>
                <div>
                    <input type="submit" disabled={this.props.disabled} value="サインイン" />
                </div>
            </form>
		);
	}
}

SignInForm.propTypes = {
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};
