import './PlanListItem.scss';

import React, { Component, PropTypes } from 'react';

import AsyncImage from '../AsyncImage/AsyncImage.js';

export default class PlanListItem extends Component {
	render() {
		const plan = this.props.plan;

		return (
            <li className="PlanListItem">
				<AsyncImage className="PlanListItem__image" src="/izu.jpg" />
				<div className="PlanListItem__actionBox">
					<h3 className="PlanListItem__title">{plan.title}</h3>
					<p className="PlanListItem__row-meta">
						created by <a href="#" className="PlanListItem__ownerName">{plan.owner}</a>
					</p>
				</div>
            </li>
		);
	}
}

PlanListItem.propTypes = {
    plan: PropTypes.object
};
