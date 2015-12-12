import MyRawTheme from '../theme/theme.js';
import { ThemeManager } from 'material-ui/lib/styles';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import API from '../service/API.js';
import * as authAction from '../actions/auth.js';

class SignInForm extends Component {
    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
      };
    }

    getInitialState() {
        return {
            isFetching: false,
            errorMessage: ''
        }
    }

    onSubmit(ev) {
        let name = this.refs.nameInput.getValue(),
            password = this.refs.passwordInput.getValue();

            API.pPost('/auth', {
    			'name': name,
    			'password': password
    		}).then(function(data){
    			if (data.status === 200) {
    				dispatch(authAction.authorized(data.result.user.name, data.result.user.token));
    			} else {
                    console.log(data);
                }
    		}).catch(function(err){
                console.log(err);
    		});

        ev.preventDefault();
        return false;
    }

    signIn(name, password) {

    }

	render() {
        const { dispatch, disabled, lastErrorMessage } = this.props;

		return (
            <form
                style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '16px',
                    margin: '16px'
                }}
                method="POST" action="#" onSubmit={(ev) => this.onSubmit(ev)}>
                <h3>サインイン</h3>
                <div>
                    <span style={{
                            color: '#f00'
                        }}>{lastErrorMessage}</span>
                </div>
                <div>
                    <TextField
                        ref="nameInput"
                        floatingLabelText="ユーザー名" />
                </div>
                <div>
                    <TextField
                        ref="passwordInput"
                        type="password"
                        floatingLabelText="パスワード" />
                </div>
                <div>
                    <input type="submit" disabled={disabled} value="サインイン" />
                </div>
            </form>
		);
	}
}

SignInForm.propTypes = {
    disabled: PropTypes.bool,
    lastErrorMessage: PropTypes.string
};

SignInForm.childContextTypes = {
	muiTheme: PropTypes.object,
};


export default connect(function(state){
    return {
        disabled: state.isFetching,
        lastErrorMessage: state.lastErrorMessage
    }
})(SignInForm)
