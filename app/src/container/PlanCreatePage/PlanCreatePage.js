import './PlanCreatePage.scss'
import '../../style/stylus/Page.scss'

import React, { Component } from 'react'
import classNames from 'classnames'

import PlanCard from 'components/PlanCard/PlanCard'
import Input from 'components/Input/Input'

import PlanStore from 'store/PlanStore'
import PhotoStore from 'store/PhotoStore'
self.PlanStore = PlanStore;

const regMimeType = /^image\/.*$/;

export default class PlanCreatePage extends Component {

    constructor() {
        super();
        this.state = {
            isDragEnter: false,
            files: []
        };
    }

    loadFiles(files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!regMimeType.test(file.type)) continue;

            this.state.files.push({
                key: file.lastModified+file.name,
                file: file,
                isSelected: false,
                url: URL.createObjectURL(file)
            });
        }

        this.setState();
    }

    _onItemClick(ev, i) {
        this.state.files[i].isSelected = !this.state.files[i].isSelected;
        this.setState();
    }

    _onRemoveIconClick(ev, i) {
        ev.preventDefault();
        ev.stopPropagation();
        this.state.files.splice(i, 1);
        this.setState();
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
        let max = 1 + this.state.files.length,
            count = 0;

        PlanStore
            .pCreate(this.refs.titleInput.value)
            .then(plan => {
                console.log(`${count}/${max}`);

                return Promise.all(this.state.files.map(file => {
					return PhotoStore.pCreate(plan, {
						title: 'タイトルなんてものはない'
					}, file.file)
					.then(photo => {
                        count++;
                        console.log(`${count}/${max}`);
					})
				}));
            })
            .then(()=>{
                console.log('complete');
            })
    }

    render() {
        let previews = this.state.files.map((file, i) => {
            return (
                <li className={classNames({
                        'PlanCreatePage__PhotoItem': true,
                        'is-selected': file.isSelected
                    })}
                    onClick={ev => this._onItemClick(ev, i)}
                    key={file.key}>
                    <div className="PlanCreatePage__PhotoItemBase" />
                    <div className="PlanCreatePage__PhotoImage"
                        style={{
                            backgroundImage: `url(${file.url})`
                        }}/>
                    <svg className="PlanCreatePage__RemoveIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        onClick={ev => this._onRemoveIconClick(ev, i)}>
                        <circle r="12" cx="12" cy="12" className="PlanCreatePage__RemoveIconBackground"/>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </li>
            );
        });

        return (<div className={classNames({
            'PlanCreatePage': true,
            'is-dragEnter': this.state.isDragEnter
        })}
        ref="base"
        onDragEnter={ev => this._onDragEnter(ev)}
        onDragLeave={ev => this._onDragLeave(ev)}
        onDrop={ev => this._onDrop(ev)}>
            <div className="PlanCreatePage__Inner">
                <section className="PlanCreatePage__Section PlanCreatePage__Section--flex">
                    <h3 className="PlanCreatePage__SectionHeader">1. 写真を追加しましょう</h3>
                    <p className="PlanCreatePage__SectionSubHeader">ドラッグ&ドロップでも追加できます</p>
                    <ul className="PlanCreatePage__PhotoList">
                        {previews}
                    </ul>
                </section>
                <section className="PlanCreatePage__Section">
                    <h3 className="PlanCreatePage__SectionHeader">2. プランの名前を決めましょう</h3>
                    <div className="PlanCreatePage__Row">
                        <Input
                            ref="titleInput"
                            label="プランの名前"/>
                        <button className="PlanCreatePage__SubmitButton"
                            onClick={ev => this._onSubmit(ev)}>
                            作成
                        </button>
                    </div>
                </section>
            </div>
            <div className="PlanCreatePage__DDReceiver"
                onDragOver={ev => this._onDragOver(ev)}
                ref="ddreceiver">
                <span>ドロップして写真を追加</span>
            </div>
        </div>)
    }
}
