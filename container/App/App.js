import './App.scss'

import MyRawTheme from '../../theme/theme'
import { ThemeManager } from 'material-ui/lib/styles'

import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/lib/app-bar'

import FeedPageLayout from '../FeedPageLayout/FeedPageLayout'
import Pager from '../../components/Pager/Pager'
import Page from '../../components/Page/Page'
import Card from '../../components/Card/Card'
import SignUpForm from '../../components/Devs/SignUpForm/SignUpForm'
import SignInForm from '../../components/Devs/SignInForm/SignInForm'
import PlanViewer from '../../components/Devs/PlanViewer/PlanViewer'

export default class App extends Component {
    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
        };
    }

	render() {
		return (
            <div className="App">
                <AppBar title="旅ログ"></AppBar>
                <div className="App__pagerWrapper">
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
