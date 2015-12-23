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
						created by
						&nbsp;<span className="PlanCard__owner">{plan.owner}</span>&nbsp;
						on
						&nbsp;<span className="PlanCard__created">{formatDate(plan.created)}</span>&nbsp;
					</p>
                </header>
            </div>
		);
	}
}

function formatDate(datenum){
	let d = new Date(datenum)
	return `${d.getFullYear()}/${('0'+(d.getMonth()+1)).substr(-2)}/${('0'+d.getDate()).substr(-2)}`;
}
