import './KNListPicker.scss'
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import KNOverlayManager from 'components/KNOverlayManager/KNOverlayManager'

class KNListPickerOverlay extends Component {
    constructor() {
        super();
        this.state = {
            entries: []
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(props) {
        this.setState({
            entries: props.entries
        });
    }

    _onClickItem(ev, index) {
        let entry = this.state.entries[index]
        entry.selected = !entry.selected;

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(ev, this.state.entries);
        }
    }

    render() {
        let entries = this.state.entries.map((entry, i) => {
            return <li className={classNames({
                    'KNListPickerOverlay__listItem': true,
                    'is-selected': entry.selected
                })}
                onClick={(ev) => this._onClickItem(ev, i)}>{entry.value}</li>
        });

        return (
            <div className="KNListPickerOverlay"
                style={{
                    top: this.props.top + 'px',
                    left: this.props.left + 'px',
                    width: this.props.width + 'px'
                }}>
                <div className="KNListPickerOverlay__base" />
                <ul className="KNListPickerOverlay__list">
                    {entries}
                </ul>
            </div>
        )
    }
}

export default class KNListPicker extends Component {
    constructor() {
        super();
        this.state = {
            layerId: null,
            entries: [],
            disabled: false
        };
    }

    set values(values) {
        this.setState({
            entries: values.map(item => ({value: item, selected: false}))
        });
    }

    set entries(entries) {
        this.setState({
            entries: entries
        });
    }

    get values() {
        return this.state.entries.map(entry => entry.value);
    }

    get entries() {
        return this.state.entries
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {
        if ('entries' in props) {
            this.entries = props.entries;

        } else if ('values' in props) {
            this.values = props.values;
        }
    }

    open() {
        if (this.state.layerId || this.state.disabled) return;

        this.setState({
            layerId: KNOverlayManager.open(this.renderLayer(), () => this._onOverlayClose())
        });
    }

    close() {
        if (!this.state.layerId || this.state.disabled) return;

        KNOverlayManager.close(this.state.layerId);
    }

    _onClick() {
        this.open();
    }

    _onOverlayClose() {
        this.setState({
            layerId: null
        });
    }

    _onChange(ev, entries) {
        this.setState({
            entries: entries
        });
    }

    renderLayer() {
        let gcr = this.refs.base.getBoundingClientRect();
        return (
            <KNListPickerOverlay
                top={gcr.top + gcr.height}
                left={gcr.left}
                width={gcr.width}
                onChange={(ev, entries) => this._onChange(ev, entries)}
                entries={this.state.entries}
            />
        );
    }

    render() {
        if (this.state.layerId) {
            KNOverlayManager.update(this.state.layerId, this.renderLayer());
        }

        let selectedEntries = this.state.entries
            .filter(entry => entry.selected)
            .map(entry => <span className="KNListPicker__selectedEntry">{entry.value}</span>);

        return (
            <div className={classNames({
                    'KNListPicker': true,
                    'is-open': this.state.layerId,
                    'is-disabled': this.state.disabled
                })}
                ref="base"
                onClick={() => this._onClick()}>
                <div className="KNListPicker__entriesWrapper">
                    <div className="KNListPicker__entries">
                        {selectedEntries}
                    </div>
                </div>
                <div className="KNListPicker__iconBox">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M7 10l5 5 5-5z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </div>
            </div>
        )
    }
}

KNListPicker.propTypes = {
    entries: PropTypes.array,
    values: PropTypes.array,
    disabled: PropTypes.boolean
}
