import './PlanCard.scss';

import React, { Component, PropTypes } from 'react';

export default class PlanCard extends Component {
	render() {
		let plan = this.props.plan,
		 	image = plan.photos.length === 0 ? false : `url(${plan.photos[0].url}?q=high&webp=0)`;

		return (
            <div className="PlanCard"
				style={{
					backgroundImage: image
				}}>
                <header className="PlanCard__header">
                    <h3 className="PlanCard__title">
						{plan.title}
					</h3>
					<p className="PlanCard__ownerRow">
						created by <span className="PlanCard__owner">{plan.owner}</span>
					</p>
                </header>
            </div>
		);
	}
}
