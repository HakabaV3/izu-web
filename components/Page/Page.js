import './Page.scss';

import React, { Component, PropTypes } from 'react';

export default class Page extends Component {
    componentWillEnter (callback) {
      this.refs.base.classList.add('--enter');
      setTimeout(callback, 240);
    }

    componentDidEnter () {
        this.refs.base.classList.remove('--enter');
    }

    componentWillLeave (callback) {
      this.refs.base.classList.add('--leave');
      setTimeout(callback, 240);
    }

    componentDidLeave () {
      this.refs.base.classList.remove('--leave');
      this.context.onPageDidLeave();
    }

    render() {
        return (
            <div ref="base" className="Page">{this.props.children}</div>
        );
    }
}

Page.contextTypes = {
    onPageDidLeave: PropTypes.func.isRequired
};

Page.propTypes = {
    pageId: PropTypes.string.isRequired
};
