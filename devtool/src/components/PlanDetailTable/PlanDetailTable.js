import React, { Component } from 'react'

import PlanStore from 'store/PlanStore'
import PhotoStore from 'store/PhotoStore'

import PlanCreateForm from 'components/PlanCreateForm/PlanCreateForm'
import PhotoDetailTable from 'components/PhotoDetailTable/PhotoDetailTable'
import PhotoUploadForm from 'components/PhotoUploadForm/PhotoUploadForm'
import Time from 'components/Time/Time'

//@TODO 応急処理
self.PhotoStore = PhotoStore;
self.PlanStore = PlanStore;

export default class PlanDetailTable extends Component {
    constructor() {
        super()
        this.state = {
            selectedPhoto: null,
            disabledRemoveButton: false
        }

        PhotoStore.subscribe(() => {
            if (!PhotoStore.state.photos.get(this.state.selectedPlanId)) {
                this._selectPhoto(PhotoStore.state.photos.values().next().value);
            } else {
                this.setState();
            }
        });
    }

    _onPhotoChange(ev) {
        let selectedPhotoId = ev.target.value,
            selectedPhoto = PhotoStore.state.photos.get(selectedPhotoId)

        this._selectPhoto(selectedPhoto);
    }

    _selectPhoto(photo) {
        this.setState({
            selectedPhoto: photo
        });
    }

    _onDeleteClick(ev) {
        this.setState({
            disabledRemoveButton: true
        });

        PlanStore.pDelete(this.props.plan.id)
            .then(()=>{
                this.setState({
                    disabledRemoveButton: false
                });
            },
            (e) => {
                console.error(e);

                this.setState({
                    disabledRemoveButton: false
                });
            });
    }

    render() {
        let plan = this.props.plan,
            planDetail = null;

        if (plan) {
            let photos = plan.photos,
                options = photos.map(photo => {
                    return (
                        <option
                            key={photo.id}
                            value={photo.id}>
                            {photo.description}
                        </option>
                    )
                });

            planDetail = [
                <tr>
                    <th>id</th>
                    <td>{plan.id}</td>
                </tr>,
                <tr>
                    <th>title</th>
                    <td>{plan.title}</td>
                </tr>,
                <tr>
                    <th>description</th>
                    <td>{plan.description}</td>
                </tr>,
                <tr>
                    <th>userId</th>
                    <td>{plan.userId}</td>
                </tr>,
                <tr>
                    <th>owner</th>
                    <td>{plan.owner}</td>
                </tr>,
                <tr>
                    <th>created</th>
                    <td><Time value={plan.created}/></td>
                </tr>,
                <tr>
                    <th>updated</th>
                    <td><Time value={plan.updated}/></td>
                </tr>,
                <tr>
                    <th>photos</th>
                    <td>
                        <select onChange={(ev) => this._onPhotoChange(ev)}>{options}</select>
                        <PhotoDetailTable photo={this.state.selectedPhoto} />
                    </td>
                </tr>,
                <tr>
                    <th>Photo追加</th>
                    <td>
                        <PhotoUploadForm plan={plan}></PhotoUploadForm>
                    </td>
                </tr>,
                <tr>
                    <th>Plan削除</th>
                    <td><input
                        type="button"
                        value="削除"
                        disabled={this.state.disabledRemoveButton}
                        onClick={(ev) => this._onDeleteClick(ev)}/></td>
                </tr>
            ];
        }

        return (
            <table
                className="dev PlanDetailTable">
                <tbody>
                    {planDetail}
                </tbody>
            </table>
        )
    }
}
