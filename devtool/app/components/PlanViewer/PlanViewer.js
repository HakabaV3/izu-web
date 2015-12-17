import React, { Component } from 'react'

import PlanStore from 'store/PlanStore'
import PhotoStore from 'store/PlanStore'

import PlanCreateForm from 'components/PlanCreateForm/PlanCreateForm'
import PlanDetailTable from 'components/PlanDetailTable/PlanDetailTable'

const planStore = PlanStore.getStore();
const photoStore = PhotoStore.getStore();

export default class PlanViewer extends Component {
    constructor() {
        super()
        this.state = {
            selectedPlanId: null,
            selectedPhotoId: null
        }

        planStore.subscribe(() => {
            if (!planStore.state.plans.get(this.state.selectedPlanId)) {
                this.setState({
                    selectedPlanId: planStore.state.plans.keys().next().value
                });
            } else {
                this.setState();
            }
        });
    }

    componentDidMount() {
        planStore.pFetchAll()
    }

    _onPlanChange(ev) {
        let selectedPlanId = ev.target.value,
            selectedPlan = planStore.state.plans.get(selectedPlanId)

        photoStore.pGetByPlan(selectedPlan)
            .then(() => {
                this.setState({});
            },
            (e) => {
                console.error(e);
            });

        this.setState({
            selectedPlanId: selectedPlanId
        });
    }

    _onPhotoChange(ev) {
        let selectedPhotoId = ev.target.value,
            selectedPhoto = photoStore.state.photos.get(selectedPhotoId)

        this.setState({
            selectedPhotoId: selectedPhotoId
        });
    }

    _onDeleteClick(ev) {
        planStore.pDelete(this.state.selectedPlanId)
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
        let plans = Array.from(planStore.state.plans.values()),
            options = plans.map((plan) => {
                return (
                    <option key={plan.id} value={plan.id}>
                        {plan.title}
                    </option>
                )
            }),
            selectedPlan = planStore.state.plans.get(this.state.selectedPlanId);

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
