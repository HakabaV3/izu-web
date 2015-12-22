import './App.scss'

import React, { Component, PropTypes } from 'react'

import AuthStore from 'store/AuthStore'

import AppShell from 'components/AppShell/AppShell'
import Pager from 'components/Pager/Pager'

import LoginPage from 'container/LoginPage/LoginPage'
import FeedPage from 'container/FeedPage/FeedPage'

const APP_TITLE = '旅ログ';

export default class App extends Component {
	constructor() {
		super();

		this.state={
			isActive: false,
			pageId: AuthStore.state.isAuthorized ? 'feed' : 'feed',
		};
	}

	render() {
		return (
            <div className="App">
				<AppShell
					sideNavDisabled={!AuthStore.state.isAuthorized}
					title={APP_TITLE}>
					<Pager selected={this.state.pageId}>
						<LoginPage pageId="login"></LoginPage>
						<FeedPage pageId="feed"></FeedPage>
					</Pager>
				</AppShell>
            </div>
		);
	}
}

App.propTypes = {};
