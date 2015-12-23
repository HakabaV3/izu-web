import './PlanCreateForm.scss'
import '../../style/stylus/Page.scss'

import React, { Component } from 'react'
import classNames from 'classnames'

import PlanCard from 'components/PlanCard/PlanCard'
import Input from 'components/Input/Input'

import PlanStore from 'store/PlanStore'
import PhotoStore from 'store/PhotoStore'
self.PlanStore = PlanStore;

const regMimeType = /^image\/.*$/;

export default class PlanCreateForm extends Component {

    constructor() {
        super();
        this.state = {
            isDragEnter: false,
            formDisabled: true,
            items: []
        };
    }

    loadFiles(files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!regMimeType.test(file.type)) continue;

            this.state.items.push({
                key: file.lastModified+file.name,
                file: file,
                isSelected: false,
                url: URL.createObjectURL(file)
            });
        }

        this.setState({
            formDisabled:(this.refs.titleInput.value.trim() === '' || this.state.items.length === 0)
        });
    }

    _onItemClick(ev, i) {
        this.state.items[i].isSelected = !this.state.items[i].isSelected;
        this.setState();
    }

    _onRemoveIconClick(ev, i) {
        ev.preventDefault();
        ev.stopPropagation();
        this.state.items.splice(i, 1);
        this.setState({
            formDisabled:(this.refs.titleInput.value.trim() === '' || this.state.items.length === 0)
        });
    }

    _onPlanTitleChanged(ev) {
        this.setState({
            formDisabled:(ev.target.value.trim() === '' || this.state.items.length === 0)
        });
    }

    _onDragEnter() {
        this.setState({
            isDragEnter: true
        });
    }

    _onDragLeave(ev) {
        if (ev.target !== this.refs.ddreceiver) return;

        this.setState({
            isDragEnter: false
        });
    }

    _onDragOver(ev) {
        ev.preventDefault();
    }

    _onDrop(ev) {
        ev.preventDefault();
        this.setState({
            isDragEnter: false
        });

        this.loadFiles(ev.dataTransfer.files);
    }

    _onSubmit(ev) {
        let max = 1 + this.state.items.length,
            count = 0;

        ev.preventDefault();
        PlanStore
            .pCreate(this.refs.titleInput.value.trim())
            .then(plan => {
                console.log(`${count}/${max}`);

                return Promise.all(this.state.items.map(item => {
					return PhotoStore.pCreate(plan, {
						title: 'タイトルなんてものはない'
					}, item.file)
					.then(photo => {
                        count++;
                        console.log(`${count}/${max}`);
					})
				}));
            })
            .then(()=>{
                console.log('complete');
                this.refs.titleInput.value = '';
                this.setState({
                    items: []
                });
            })
    }

    render() {
        let previews = this.state.items.map((item, i) => {
            return (
                <li className={classNames({
                        'PlanCreateForm__PhotoItem': true,
                        'is-selected': item.isSelected
                    })}
                    onClick={ev => this._onItemClick(ev, i)}
                    key={item.key}>
                    <div className="PlanCreateForm__PhotoItemBase" />
                    <div className="PlanCreateForm__PhotoImage"
                        style={{
                            backgroundImage: `url(${item.url})`
                        }}/>
                    <svg className="PlanCreateForm__RemoveIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        onClick={ev => this._onRemoveIconClick(ev, i)}>
                        <circle r="12" cx="12" cy="12" className="PlanCreateForm__RemoveIconBackground"/>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </li>
            );
        });

        return (<form className={classNames({
            'PlanCreateForm': true,
            'is-dragEnter': this.state.isDragEnter
        })}
        ref="base"
        disabled={this.state.formDisabled}
        onSubmit={ev => this._onSubmit(ev)}
        onDragEnter={ev => this._onDragEnter(ev)}
        onDragLeave={ev => this._onDragLeave(ev)}
        onDrop={ev => this._onDrop(ev)}>
            <div className="PlanCreateForm__Inner">
                <section className="PlanCreateForm__Section">
                    <div className="PlanCreateForm__Row">
                        <Input
                            onChange={ev => this._onPlanTitleChanged(ev)}
                            ref="titleInput"
                            label="プランの名前"/>
                        <button className="PlanCreateForm__SubmitButton"
                            disabled={this.state.formDisabled}>
                            作成
                        </button>
                    </div>
                </section>
                <section className="PlanCreateForm__Section">
                    <p className="PlanCreateForm__PhotoList--placeholder">ドラッグ&ドロップで写真を追加</p>
                    <ul className="PlanCreateForm__PhotoList">
                        {previews}
                    </ul>
                </section>
            </div>
            <div className="PlanCreateForm__DDReceiver"
                onDragOver={ev => this._onDragOver(ev)}
                ref="ddreceiver">
                <span>ドロップして写真を追加</span>
            </div>
        </form>)
    }
}
