import React, { Component } from 'react'
import PhotoViewer from '../PhotoViewer/PhotoViewer'
import PlanStore from 'store/PlanStore'
import PhotoStore from 'store/PhotoStore'

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
            this.setState({})
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

    render() {
        let plans = Array.from(planStore.state.plans.values()),
            options = plans.map((plan) => {
                return (
                    <option key={plan.id} value={plan.id}>
                        {plan.title}
                    </option>
                )
            }),
            selectedPlan = planStore.state.plans.get(this.state.selectedPlanId),
            planDetail = null;

        if (selectedPlan) {
            let photos = selectedPlan.photos,
                options = photos.map(photo => {
                    return (
                        <option key={photo.id} value={photo.id}>
                            {photo.description}
                        </option>
                    )
                });

            planDetail = (
                <table>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <td>{selectedPlan.id}</td>
                        </tr>
                        <tr>
                            <th>title</th>
                            <td>{selectedPlan.title}</td>
                        </tr>
                        <tr>
                            <th>description</th>
                            <td>{selectedPlan.description}</td>
                        </tr>
                        <tr>
                            <th>userId</th>
                            <td>{selectedPlan.userId}</td>
                        </tr>
                        <tr>
                            <th>owner</th>
                            <td>{selectedPlan.owner}</td>
                        </tr>
                        <tr>
                            <th>created</th>
                            <td>{selectedPlan.created}</td>
                        </tr>
                        <tr>
                            <th>updated</th>
                            <td>{selectedPlan.updated}</td>
                        </tr>
                        <tr>
                            <th>photos</th>
                            <td>
                                <select onChange={(ev) => this._onPhotoChange(ev)}>{options}</select>
                                <PhotoViewer selectedPhotoId={this.state.selectedPhotoId} />
                            </td>
                        </tr>
                        <tr>
                            <th>DELETE</th>
                            <td><input type="button" value="削除" onClick={(ev) => this._onDeleteClick(ev)}/></td>
                        </tr>
                    </tbody>
                </table>
            );
        }

        return (
            <div
                className="dev PlanViewer"
                onSubmit={(ev) => this._onFormSubmit(ev)}>
                <h3>プラン詳細確認</h3>
                <p>
                    <select
                        onChange={(ev) => this._onPlanChange(ev)}>
                        {options}
                    </select>
                </p>
                {planDetail}
            </div>
        )
    }
}
