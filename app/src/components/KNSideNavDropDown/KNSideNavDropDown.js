import './KNSideNavDropDown.scss'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const TransitionState = {
    NONE: -1,
    OPENING: 0,
    CLOSING: 1
};

export class KNSideNavDropDown extends Component {
    constructor() {
        super();

        this.state = {
            bodyHeight: 0,
            isOpen: false,
            transitionState: TransitionState.NONE
        };
    }

    toggle() {
        this.state.isOpen ? this.close() : this.open();
    }

    open() {
        if (this.state.transitionState !== TransitionState.NONE ||
            this.state.isOpen) return;

        this.setState({
            bodyHeight: this.refs.body.clientHeight,
            transitionState: TransitionState.OPENING,
            isOpen: true
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
            bodyHeight: 0,
            transitionState: TransitionState.CLOSING,
            isOpen: true
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
                    'KNSideNavDropDown': true,
                    'is-open': this.state.isOpen,
                    'is-opening': this.state.transitionState === TransitionState.OPENING,
                    'is-closing': this.state.transitionState === TransitionState.CLOSING
                })}>
                <header className="KNSideNavDropDown__header"
                    onClick={() => this.toggle()}>
                    <div className="KNSideNavDropDown__headerInner">
                        {this.props.title}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M7 10l5 5 5-5z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </header>
                <div className="KNSideNavDropDown__bodyWrapper"
                    style={{
                        height: `${this.state.bodyHeight}px`
                    }}>
                    <ul className="KNSideNavDropDown__body" ref="body">
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }
}
KNSideNavDropDown.propTypes = {
    title: PropTypes.string
};

export const KNSideNavDropDownItem = (props) => (
    <li className={classNames({
            'KNSideNavDropDownItem': true,
            'is-disabled': props.disabled
        })}
        onClick={props.onClick}>
        {props.children}
    </li>
);

KNSideNavDropDownItem.propTypes = {
    disabled: PropTypes.boolean
};
