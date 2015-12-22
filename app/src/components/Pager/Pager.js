import './Pager.scss'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const TransitionState = {
    NONE: -1,
    FADE_OUT: 0,
    FADE_IN: 1
}
export default class Pager extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: -1,
            nextSelectIndex: -1,
            transitionState: TransitionState.NONE
        };
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.pNavigateTo(nextProps.selected);
    }

    pNavigateTo(pageId) {
        let nextSelectIndex = this.findPageIndexById(pageId);
        if (nextSelectIndex === this.state.selectedIndex ||
            nextSelectIndex === this.state.nextSelectIndex) return Promise.resolve();

        this.setState({
            nextSelectIndex: nextSelectIndex
        });

        return this.pFadeOut()
            .then(() => this.pFadeIn(nextSelectIndex))
            .then(() => {
                this.setState({
                    nextSelectIndex: -1
                });
            });
    }

    pFadeOut() {
        if (this.state.selectedIndex === -1) return Promise.resolve();

        return new Promise(resolve => {
            this.setState({
                transitionState: TransitionState.FADE_OUT
            });
            setTimeout(() => {
                this.setState({
                    selectedIndex: -1,
                    transitionState: TransitionState.NONE
                });
                resolve();
            }, 300);
        })
    }

    pFadeIn(index) {
        if (this.state.selectedIndex === index) return Promise.resolve();

        return new Promise(resolve => {
            this.setState({
                selectedIndex: index,
                transitionState: TransitionState.FADE_IN
            });
            setTimeout(() => {
                this.setState({
                    transitionState: TransitionState.NONE
                });
                resolve();
            }, 300);
        })
    }

    findPageIndexById(pageId) {
        if (this.props.children instanceof Array) {
            for (let i = 0; i < this.props.children.length; i++) {
                if (this.props.children[i].props.pageId === pageId) return i;
            }
        } else {
            if (this.props.children.props.pageId === pageId) return 0;
        }
        return -1;
    }

    render() {
        let children;
        if (this.props.children instanceof Array) {
            children = this.props.children.map((child, i) => (
                <div style={{
                    display: i === this.state.selectedIndex ? false : 'none'
                }}
                key={i}>
                    {child}
                </div>
            ));
        } else {
            children = (
                <div style={{
                    display: this.state.selectedIndex === 0 ? false : 'none'
                }}
                key={0}>
                    {this.props.children}
                </div>
            );
        }

        return (
            <div className="Pager"
                selected={this.props.selected}>
                <div className={classNames({
                    'Pager__Inner': true,
                    'is-fadeIn': this.state.transitionState === TransitionState.FADE_IN,
                    'is-fadeOut': this.state.transitionState === TransitionState.FADE_OUT
                })}>
                    {
                        (this.props.children instanceof Array) ?
                            this.props.children[this.state.selectedIndex] :
                            this.state.selectedIndex === 0 ? this.props.children : null
                    }
                </div>
            </div>
        );
    }
}

Pager.propTypes = {
    selected: PropTypes.string
};
