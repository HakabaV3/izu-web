import './AsyncImage.scss';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import 'whatwg-fetch';

export default class AsyncImage extends Component {
	constructor() {
		super();

		this.state = {
			originalUrl: null,
			createdUrl: null,
			loading: false,
			isMount: false
		}
	}

	componentWillMount() {
		this.setState({
			isMount: true
		});
	}

	componentDidMount() {
		this.checkUrl();
	}

	componentWillUnMount() {
		this.setState({
			isMount: false
		});
	}

	componentWillReceiveProps(props) {
		this.checkUrl();
	}

	checkUrl() {
		if (!this.state.isMount ||
			!this.props.src ||
			this.props.src === this.state.originalUrl) return;

		const nextUrl = this.props.src;
		this.setState({
			originalUrl: nextUrl,
			createdUrl: null,
			loading: true
		});

		this.pImageFetch(nextUrl)
			.then(url => {
				this.setState({
					createdUrl: url,
					loading: false
				})
			})
			.catch(err => {
				console.error(err);
				this.setState({
					loading: false
				})
			})
	}

	pImageFetch(url) {
		return fetch(url)
			.then(res => res.blob())
			.then(blob => URL.createObjectURL(blob));
	}

	render() {
		let backgroundImage = (!this.state.loading && this.state.createdUrl) ? `url(${this.state.createdUrl})` : '';

		return (
            <img
				className={classNames({
					'AsyncImage': true,
					'--loading': this.state.loading
				})}
				style={{
					backgroundImage: backgroundImage
				}} />
		);
	}
}

AsyncImage.propTypes = {
    src: PropTypes.string
};
