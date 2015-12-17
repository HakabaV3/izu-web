import React, { Component } from 'react'
import PhotoStore from 'store/PhotoStore'

const photoStore = PhotoStore.getStore();

export default class PhotoViewer extends Component {
    constructor() {
        super()

        photoStore.subscribe(() => {
            this.setState({})
        });
    }

    componentDidMount() {
    }

    _onDeleteClick(ev) {
        let selectedPhotoId = this.props.selectedPhotoId,
            selectedPhoto = photoStore.state.photos.get(selectedPhotoId);

        photoStore.pDelete(selectedPhoto)
            .then(()=>{
                this.setState({});
            },
            (e) => {
                console.error(e);
            });
    }

    render() {
        let selectedPhotoId = this.props.selectedPhotoId,
            selectedPhoto = photoStore.state.photos.get(selectedPhotoId),
            tbody = undefined;

        if (selectedPhoto) {
            tbody = (
                <tbody>
                    <tr>
                        <th>id</th>
                        <td>{selectedPhoto.id}</td>
                    </tr>
                    <tr>
                        <th>description</th>
                        <td>{selectedPhoto.description}</td>
                    </tr>
                    <tr>
                        <th>planId</th>
                        <td>{selectedPhoto.planId}</td>
                    </tr>
                    <tr>
                        <th>userId</th>
                        <td>{selectedPhoto.userId}</td>
                    </tr>
                    <tr>
                        <th>owner</th>
                        <td>{selectedPhoto.owner}</td>
                    </tr>
                    <tr>
                        <th>latitude</th>
                        <td>{selectedPhoto.latitude}</td>
                    </tr>
                    <tr>
                        <th>longitude</th>
                        <td>{selectedPhoto.longitude}</td>
                    </tr>
                    <tr>
                        <th>date</th>
                        <td>{selectedPhoto.date}</td>
                    </tr>
                    <tr>
                        <th>created</th>
                        <td>{selectedPhoto.created}</td>
                    </tr>
                    <tr>
                        <th>updated</th>
                        <td>{selectedPhoto.updated}</td>
                    </tr>
                    <tr>
                        <th>DELETE</th>
                        <td><input type="button" value="削除" onClick={(ev) => this._onDeleteClick(ev)}/></td>
                    </tr>
                    <tr>
                        <th>image</th>
                        <td>
                            <img style={{
                                    maxWidth: '100%'
                                }}
                                src={selectedPhoto.url} />
                        </td>
                    </tr>
                </tbody>
            );
        }

        return (
            <table
                className="PhotoViewer dev">
                {tbody}
            </table>
        )
    }
}
