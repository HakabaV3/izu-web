import './FeedPage.scss'
import '../../style/stylus/Page.scss'

import React, { Component } from 'react'
import classNames from 'classnames'

import PlanCard from 'components/PlanCard/PlanCard'
import PlanCreateForm from 'container/PlanCreateForm/PlanCreateForm'

import PlanStore from 'store/PlanStore'
import PhotoStore from 'store/PhotoStore'
self.PlanStore = PlanStore;

export default class FeedPage extends Component {

    constructor() {
        super();
        this.state = {};
        PlanStore.pFetchAll();
        PlanStore.subscribe(() => {
            Array.from(PlanStore.state.plans.values()).forEach(plan => {
                if (plan.photos.length === 0) {
                    PhotoStore.pGetByPlan(plan);
                }
            });
            this.setState()
        });
        PhotoStore.subscribe(() => this.setState());
    }

    render() {
        let items = Array.from(PlanStore.state.plans.values())
            .sort((a, b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0)
            .map(plan => <PlanCard plan={plan} />);

        return (<div className={classNames({
            'FeedPage': true
        })}>
            <div className="Page__Wrapper">
                <div className="Page__SideColumn1">
                    &nbsp;
                </div>
                <div className="Page__MainColumn">
                    <section className="FeedPage__Section">
                        <header className="FeedPage__SectionTitleHeader">
                            <h3>プラン新規作成</h3>
                        </header>
                        <PlanCreateForm />
                    </section>
                    <section className="FeedPage__Section">
                        <header className="FeedPage__SectionTitleHeader">
                            <h3>新着プラン</h3>
                        </header>
                        <ul className="FeedPage__PlanCardList">
                            {items}
                        </ul>
                    </section>
                </div>
                <div className="Page__SideColumn2">
                    &nbsp;
                </div>
            </div>
        </div>)
    }
}
