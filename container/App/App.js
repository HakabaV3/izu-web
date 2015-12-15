import './App.scss';

import MyRawTheme from '../../theme/theme.js';
import { ThemeManager } from 'material-ui/lib/styles';

import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';

import FeedPageLayout from '../FeedPageLayout/FeedPageLayout';
import Pager from '../../components/Pager/Pager';
import Page from '../../components/Page/Page';
import Card from '../../components/Card/Card';

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
                    <Pager selected="feed" ref="pager">
                        <Page pageId="feed" key="feed">
                            <FeedPageLayout onGoToPage2Click={() => this.refs.pager.navigateTo('p2')} />
                        </Page>
                        <Page pageId="p2" key="p2">
                            <h1>ページ2</h1>
                            <p>
                                <button onClick={() => this.refs.pager.navigateTo('feed')}>フィードへ</button>
                            </p>
                        </Page>
                    </Pager>
                </div>
            </div>
		);
	}
}

App.propTypes = {};
App.childContextTypes = {
	muiTheme: PropTypes.object,
};
