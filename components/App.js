import MyRawTheme from '../theme/theme.js';
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { ThemeManager } from 'material-ui/lib/styles';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class App extends Component {
    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
      };
    }

    onSignUpSubmit(name, password) {
        authStore.dispatch(signUp(name, password));
    }

	render() {
		return (
            <div>
    			<AppBar title="旅ログ" />
                <SignInForm />
                <SignUpForm />
            </div>
		);
	}
}

App.propTypes = {};
App.childContextTypes = {
	muiTheme: PropTypes.object,
};

export default App
