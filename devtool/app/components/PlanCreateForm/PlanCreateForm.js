import React, { Component } from 'react'
import PlanStore from 'store/PlanStore'

const planStore = PlanStore.getStore();

const State = {
    SLEEP: 'SLEEP',
    ACTIVE: 'ACTIVE',
    ERROR: 'ERROR'
};

export default class PlanCreateForm extends Component {
    constructor() {
        super()

        this.state={
            title: null,
            state: State.SLEEP
        };
        planStore.subscribe(() => {
            this.setState({})
        });
    }

    _onTitleChange(ev) {
        this.setState({
            title: ev.target.value
        });
    }

    _onSubmitClick(ev) {
        this.setState({
            state: State.ACTIVE
        });

        planStore
            .pCreate(this.state.title)
            .then(() => {
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
        let state, disabled;

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

        return (
            <table
                className="PlanCreateForm dev">
                <tbody>
                    <tr>
                        <th>title</th>
                        <td><input
                            type="text"
                            value={this.state.title}
                            disabled={disabled}
                            onChange={ev => this._onTitleChange(ev)}/></td>
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
            </table>
        )
    }
}
