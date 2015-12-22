import './SideNav.scss';
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const TransitionState = {
    NONE: -1,
    OPENING: 0,
    CLOSING: 1
};

export default class SideNav extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false,
            transitionState: TransitionState.NONE
        };
    }

    toggle(flagForce=false) {
        return this.state.isOpen ? this.close() : this.open(flagForce);
    }

    open(flagForce=false) {
        if (this.state.transitionState !== TransitionState.NONE ||
            this.state.isOpen ||
            (this.props.disabled && !flagForce)) return;

        this.setState({
            isOpen: true,
            transitionState: TransitionState.OPENING
        });
        setTimeout(() => {
            this.setState({
                transitionState: TransitionState.NONE
            });
        }, 300);
    }

    close() {
        if (this.state.transitionState !== TransitionState.NONE ||
            !this.state.isOpen) return;

        this.setState({
            transitionState: TransitionState.CLOSING
        });
        setTimeout(() => {
            this.setState({
                isOpen: false,
                transitionState: TransitionState.NONE
            });
        }, 300);
    }

    render() {
        return (
            <div className={classNames({
                    'SideNav': true,
                    'is-open': this.state.isOpen,
                    'is-opening': this.state.transitionState === TransitionState.OPENING,
                    'is-closing': this.state.transitionState === TransitionState.CLOSING
                })}>
                <div className="SideNav__shadow"
                     onClick={() => this.close()}/>
                <div className="SideNav__side">
                    <header className="SideNav__sideHeader"
                        onClick={() => this.close()}>
                        {this.props.title}
                    </header>
                    <div className="SideNav__sideBody">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

SideNav.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.boolean
};
