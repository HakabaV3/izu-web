import MyRawTheme from '../theme/theme.js';
import { ThemeManager } from 'material-ui/lib/styles';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import authAction from '../actions/auth';

class SignUpForm extends Component {
    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
      };
    }

    onSubmit(ev) {
        let name = this.refs.nameInput.getValue(),
            password = this.refs.passwordInput.getValue();

        this.props.onSubmit(name, password);

        ev.preventDefault();
        return false;
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
                <h3>サインアップ</h3>
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
                    <input type="submit" disabled={disabled} value="サインアップ" />
                </div>
            </form>
		);
	}
}

SignUpForm.propTypes = {
    disabled: PropTypes.bool,
    lastErrorMessage: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};

SignUpForm.childContextTypes = {
	muiTheme: PropTypes.object,
};


export default connect(function(state){
    return {
        disabled: state.isFetching,
        lastErrorMessage: state.lastErrorMessage
    }
})(SignUpForm)
