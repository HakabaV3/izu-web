import MyRawTheme from '../theme/theme.js'
import React, { Component, PropTypes } from 'react'
import { AppBar } from 'material-ui/lib'
import { ThemeManager } from 'material-ui/lib/styles';

class App extends Component {
    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
      };
    }

	render() {
		return (
			<AppBar title="旅ログ" />
		);
	}
}

App.propTypes = {};
App.childContextTypes = {
	muiTheme: PropTypes.object,
};

export default App
