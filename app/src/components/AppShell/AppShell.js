import './AppShell.scss';
import React, { Component, PropTypes } from 'react'
import AppBar from 'components/AppBar/AppBar'
import SideNav from 'components/SideNav/SideNav'

export default class AppShell extends Component {
    toggleSideNav() {
        return this.refs.side.toggle();
    }

    openSideNav() {
        return this.refs.side.open();
    }

    closeSideNav() {
        return this.refs.side.close();
    }

    render() {
        return (
            <div className="AppShell">
                <AppBar left={
                        <button className="AppShell__sideToggleButton"
                            style={{
                                'display': this.props.sideNavDisabled ? 'none' : ''
                            }}
                            onClick={() => this.refs.side.toggle()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                            </svg>
                        </button>
                    }
                    title={this.props.pageTitle || this.props.title} />
                <div className="AppShell__body">
                    {this.props.children}
                </div>
                <SideNav ref="side"
                    disabled={this.props.sideNavDisabled}
                    title={this.props.appTitle}>
                    {this.props.side}
                </SideNav>
            </div>
        )
    }
}

AppShell.propTypes = {
    title: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
    sideNavDisabled: PropTypes.string.boolean,
    side: PropTypes.node
};
