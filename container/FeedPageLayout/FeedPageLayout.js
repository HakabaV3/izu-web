// import './Page.scss';

import React, { Component, PropTypes } from 'react';

import PlanList from '../../components/PlanList/PlanList';

import PlanStore from '../../store/PlanStore';
const planStore = PlanStore.getStore();
self.planStore = planStore;
export default class FeedPageLayout extends Component {
	constructor() {
		super();

		this.state = {
			plans: Array.from(planStore.state.plans.values())
		};
		planStore.subscribe(() => this._onPlanStoreDispatch());
	}

	updatePlans() {
		planStore.getAll();
	}

	_onPlanStoreDispatch() {
		this.setState({
			plans: Array.from(planStore.state.plans.values())
		});
	};

	render() {
		let plans = this.state.plans.slice(0);
		plans = plans.concat(plans);
		plans = plans.concat(plans);
		plans = plans.concat(plans);
		plans = plans.concat(plans);
		plans = plans.concat(plans)
			.map((plan) => {
				return Object.assign({}, plan, {
					id: Math.random()
				});
			})

		return (
            <div className="FeedPageLayout Layout">
                <h1>フィード</h1>
				<button onClick={(ev) => this.updatePlans(ev)}>更新</button>
				<PlanList plans={plans}></PlanList>
            </div>
		);
	}
}

FeedPageLayout.propTypes = {
    onGoToPage2Click: PropTypes.func.isRequired
};
