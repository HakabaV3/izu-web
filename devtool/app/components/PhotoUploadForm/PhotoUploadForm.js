import React, { Component } from 'react'
import PhotoStore from 'store/PhotoStore'

const State = {
    SLEEP: 'SLEEP',
    ACTIVE: 'ACTIVE',
    ERROR: 'ERROR'
};

export default class PhotoUploader extends Component {
    constructor() {
        super()

        this.state={
            file: null,
            fileURL: '',
            description: '',
            latitude: 0,
            longitude: 0,
            date: 0,
            state: State.SLEEP
        };
        PhotoStore.subscribe(() => {
            this.setState({})
        });
    }

    _onFileChange(ev) {
        let file = ev.target.files[0],
            fileURL = URL.createObjectURL(file);

        this.setState({
            file: file,
            fileURL: fileURL
        });
    }

    _onDescriptionChange(ev) {
        this.setState({
            description: ev.target.value
        });
    }
    _onLatitudeChange(ev) {
        this.setState({
            latitude: ev.target.value
        });
    }
    _onLongitudeChange(ev) {
        this.setState({
            longitude: ev.target.value
        });
    }

    _onSubmitClick(ev) {
        this.setState({
            state: State.ACTIVE
        });

        PhotoStore
            .pCreate(this.props.plan, {
                description: this.state.description,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                date: this.state.date,
            }, this.state.file)
            .then(()=>{
                this.setState({
                    state: State.SLEEP
                });
            },
            (e) => {
                console.error(e);
                this.setState({
                    state: State.ERROR
                });
            });
    }

    render() {
        let plan = this.props.plan,
            tbody = undefined,
            state, disabled;

        if (plan) {
            switch (this.state.state) {
                case State.SLEEP:
                    disabled = false;
                    state = '待機';
                    break;

                case State.ACTIVE:
                    disabled = true;
                    state = '通信中';
                    break;

                case State.ERROR:
                    disabled = false;
                    state = 'エラー';
                    break;
            }
            tbody = (
                <tbody>
                    <tr>
                        <th rowSpan="2">file</th>
                        <td><input
                            type="file"
                            disabled={disabled}
                            onChange={ev => this._onFileChange(ev)}/></td>
                    </tr>
                    <tr>
                        <td>
                            <img style={{
                                    maxWidth: '100%'
                                }}
                                src={this.state.fileURL} />
                        </td>
                    </tr>
                    <tr>
                        <th>description</th>
                        <td><input
                                type="text"
                                value={this.state.description}
                                disabled={disabled}
                                onChange={ev => this._onDescriptionChange(ev)}/></td>
                    </tr>
                    <tr>
                        <th>latitude</th>
                        <td><input
                            type="number"
                            value={this.state.latitude}
                            disabled={disabled}
                            onChange={ev => this._onLatitudeChange(ev)}/></td>
                    </tr>
                    <tr>
                        <th>longitude</th>
                        <td><input
                            type="number"
                            value={this.state.longitude}
                            disabled={disabled}
                            onChange={ev => this._onLongitudeChange(ev)}/></td>
                    </tr>
                    <tr>
                        <th>送信</th>
                        <td><input
                            type="button"
                            value="送信"
                            disabled={disabled}
                            onClick={ev => this._onSubmitClick(ev)}/></td>
                    </tr>
                    <tr>
                        <th>状態</th>
                        <td><span>{state}</span></td>
                    </tr>
                </tbody>
            );
        }
        return (
            <table
                className="PhotoUploadForm dev">
                {tbody}
            </table>
        )
    }
}
