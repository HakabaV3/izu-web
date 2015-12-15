import './Pager.scss';

import React, { Component, PropTypes } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

export default class Pager extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: -1,
            nextSelectIndex: -1
        };
    }

    getChildContext() {
        return {
            onPageDidLeave: this._onPageDidLeave.bind(this)
        };
    }

    componentDidMount() {
        this.navigateTo(this.props.selected);
    }

    navigateTo(pageId) {
        let nextSelectIndex = this.findPageById(pageId);
        if (nextSelectIndex === this.state.selectedIndex ||
            nextSelectIndex === this.state.nextSelectIndex) return;

        if (this.state.selectedIndex === -1) {
            this.setState({
                selectedIndex: nextSelectIndex,
                nextSelectIndex: -1
            });
        } else {
            this.setState({
                selectedIndex: -1,
                nextSelectIndex: nextSelectIndex
            });
        }
    }

    findPageById(pageId) {
        for (let i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i].props.pageId === pageId) return i;
        }
        return -1;
    }

    _onPageDidLeave() {
        this.setState({
            selectedIndex: this.state.nextSelectIndex,
            nextSelectIndex: -1
        });
    }

    render() {
        return (
            <div
                selected={this.props.selected}
                className="Pager">
                <ReactTransitionGroup component="div">
                    { this.props.children[this.state.selectedIndex] }
                </ReactTransitionGroup>
            </div>
        );
    }
}

Pager.childContextTypes = {
    onPageDidLeave: PropTypes.func.isRequired
};

Pager.propTypes = {
    selected: PropTypes.string
};
