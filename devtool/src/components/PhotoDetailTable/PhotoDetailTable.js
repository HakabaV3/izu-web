import React, { Component } from 'react'
import PhotoStore from 'store/PhotoStore'
import Time from 'components/Time/Time'

export default class PhotoDetailTable extends Component {
    constructor() {
        super()

        PhotoStore.subscribe(() => {
            this.setState({})
        });
    }

    _onDeleteClick(ev) {
        PhotoStore.pDelete(this.props.photo)
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
                        <td>{photo.id}</td>
                    </tr>
                    <tr>
                        <th>description</th>
                        <td>{photo.description}</td>
                    </tr>
                    <tr>
                        <th>planId</th>
                        <td>{photo.planId}</td>
                    </tr>
                    <tr>
                        <th>userId</th>
                        <td>{photo.userId}</td>
                    </tr>
                    <tr>
                        <th>owner</th>
                        <td>{photo.owner}</td>
                    </tr>
                    <tr>
                        <th>latitude</th>
                        <td>{photo.latitude}</td>
                    </tr>
                    <tr>
                        <th>longitude</th>
                        <td>{photo.longitude}</td>
                    </tr>
                    <tr>
                        <th>date</th>
                        <td><Time value={photo.date}/></td>
                    </tr>
                    <tr>
                        <th>created</th>
                        <td><Time value={photo.created}/></td>
                    </tr>
                    <tr>
                        <th>updated</th>
                        <td><Time value={photo.updated}/></td>
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
                                src={photo.url} />
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
