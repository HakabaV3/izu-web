import './App.scss'

import MyRawTheme from 'theme/theme'
import { ThemeManager } from 'material-ui/lib/styles'

import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/lib/app-bar'

import SignUpForm from 'components/SignUpForm/SignUpForm'
import SignInForm from 'components/SignInForm/SignInForm'
import PlanViewer from 'components/PlanViewer/PlanViewer'
import API from 'service/API'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            host: localStorage.getItem('host') || 'izu-staging.hakaba.xyz'
        };
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
        };
    }

    _onChangeAPIHost(ev) {
        localStorage.setItem('host', ev.target.value);
        location.reload();
    }

	render() {
		return (
            <div className="App">
                <AppBar title="Izu development tool"></AppBar>
                <div className="App__pagerWrapper">
                    <p style={{
                            padding: '0px 16px'
                        }}>
                        <label>
                            <span>APIサーバー</span>
                            <select onChange={(ev) => this._onChangeAPIHost(ev)}
                                value={this.state.host}>
                                <option value="izu-staging.hakaba.xyz">izu-staging.hakaba.xyz</option>
                                <option value="izu.hakaba.xyz">izu.hakaba.xyz</option>
                            </select>
                        </label>
                    </p>
                    <SignUpForm></SignUpForm>
                    <SignInForm></SignInForm>
                    <PlanViewer></PlanViewer>
                </div>
            </div>
		);
	}
}

App.propTypes = {};
App.childContextTypes = {
	muiTheme: PropTypes.object,
};
