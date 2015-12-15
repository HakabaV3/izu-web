import './PlanList.scss';

import React, { Component, PropTypes } from 'react';
import PlanListItem from './PlanListItem';

export default class PlanList extends Component {
	render() {
        let listItems = this.props.plans.map(function(plan) {
             return (
               <PlanListItem key={plan.id} plan={plan} />
             );
           });

        let state = this.props.isActive ? '通信中' : '待機'

		return (
            <div className="PlanList">
                <header>
                    <h3>プラン一覧</h3>
                    <span>状態:{state}</span>
                </header>

                <ul className="PlanList__list">{listItems}</ul>
            </div>
		);
	}
}

PlanList.propTypes = {
    plans: PropTypes.array,
    isActive: PropTypes.bool
};
