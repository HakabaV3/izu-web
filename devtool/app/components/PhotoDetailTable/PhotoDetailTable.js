import React, { Component } from 'react'
import PhotoStore from 'store/PhotoStore'
import Time from 'components/Time/Time'

const photoStore = PhotoStore.getStore();

export default class PhotoDetailTable extends Component {
    constructor() {
        super()

        photoStore.subscribe(() => {
            this.setState({})
        });
    }

    componentDidMount() {
    }

    _onDeleteClick(ev) {
        photoStore.pDelete(this.props.photo)
            .then(()=>{
                this.setState({});
            },
            (e) => {
                console.error(e);
            });
    }

    render() {
        let photo = this.props.photo,
            tbody = undefined;

        if (photo) {
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
                        <td><Time value={selectedPhoto.date}/></td>
                    </tr>
                    <tr>
                        <th>created</th>
                        <td><Time value={selectedPhoto.created}/></td>
                    </tr>
                    <tr>
                        <th>updated</th>
                        <td><Time value={selectedPhoto.updated}/></td>
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
                className="PhotoDetailTable dev">
                {tbody}
            </table>
        )
    }
}
