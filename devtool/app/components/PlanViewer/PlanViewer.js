import React, { Component } from 'react'

import PlanStore from 'store/PlanStore'
import PhotoStore from 'store/PhotoStore'

import PlanCreateForm from 'components/PlanCreateForm/PlanCreateForm'
import PlanDetailTable from 'components/PlanDetailTable/PlanDetailTable'

export default class PlanViewer extends Component {
    constructor() {
        super()
        this.state = {
            selectedPlanId: null,
            selectedPhotoId: null
        }

        PlanStore.subscribe(() => {
            if (!PlanStore.state.plans.get(this.state.selectedPlanId)) {
                this._selectPlan(PlanStore.state.plans.values().next().value)
            } else {
                this.setState();
            }
        });
    }

    componentDidMount() {
        PlanStore.pFetchAll();
    }

    _onPlanChange(ev) {
        let selectedPlanId = ev.target.value,
            selectedPlan = PlanStore.state.plans.get(selectedPlanId)

        this._selectPlan(selectedPlan);
    }

    _selectPlan(plan) {
        PhotoStore.pGetByPlan(plan)
            .then(() => {
                this.setState({});
            },
            (e) => {
                console.error(e);
            });

        this.setState({
            selectedPlanId: plan.id
        });
    }

    _onPhotoChange(ev) {
        let selectedPhotoId = ev.target.value,
            selectedPhoto = PhotoStore.state.photos.get(selectedPhotoId)

        this.setState({
            selectedPhotoId: selectedPhotoId
        });
    }

    _onDeleteClick(ev) {
        PlanStore.pDelete(this.state.selectedPlanId)
            .then(()=>{
                this.setState({});
            },
            (e) => {
                console.error(e);
            });
    }

    _onUploadClick(ev) {

    }

    render() {
        let plans = Array.from(PlanStore.state.plans.values()),
            options = plans.map((plan) => {
                return (
                    <option key={plan.id} value={plan.id}>
                        {plan.title}
                    </option>
                )
            }),
            selectedPlan = PlanStore.state.plans.get(this.state.selectedPlanId);

        return (
            <div
                className="dev PlanViewer"
                onSubmit={(ev) => this._onFormSubmit(ev)}>
                <h3>プラン</h3>
                <section>
                    <h4>作成</h4>
                    <PlanCreateForm />
                </section>
                <section>
                    <h4>プラン詳細</h4>
                    <p>
                        <select
                            onChange={(ev) => this._onPlanChange(ev)}>
                            {options}
                        </select>
                    </p>
                    <PlanDetailTable plan={selectedPlan} />
                </section>
            </div>
        )
    }
}
