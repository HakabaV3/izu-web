import './KNDropDownMenu.scss'
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import KNOverlayManager from 'components/KNOverlayManager/KNOverlayManager'

export default class KNDropDownMenuOverlay extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            entries: [{
                text: 'Never'
            }, {
                text: 'Every Night'
            }, {
                text: 'Weeknights'
            }, {
                text: 'Weekends'
            }, {
                text: 'Weekly'
            }]
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(props) {
        this.setState({
            selectedIndex: props.selectedIndex === undefined ?  this.state.selectedIndex : props.selectedIndex,
            entries: props.entries || this.state.entries
        });
    }

    render() {
        let items = this.state.entries.map(entry => {
            <li className="KNDropDownMenuOverlay__item">{entry.text}</li>
        });

        return (
            <div className="KNDropDownMenuOverlay">
                <div className="KNDropDownMenuOverlay__base">
                    <ul className="KNDropDownMenuOverlay__list">
                        {items}
                    </ul>
                </div>
            </div>
        )
    }
}

export default class KNDropDownMenu extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            entries: [{
                text: 'Never'
            }, {
                text: 'Every Night'
            }, {
                text: 'Weeknights'
            }, {
                text: 'Weekends'
            }, {
                text: 'Weekly'
            }],
            overlayId: null
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(props) {
        this.setState({
            selectedIndex: props.selectedIndex === undefined ?  this.state.selectedIndex : props.selectedIndex,
            entries: props.entries || this.state.entries
        });
    }

    _onClick(ev) {
        this.setState({
            overlayId: KNOverlayManager.open(this.renderOverlay())
        });
    }
    renderOverlay() {
        return <KNDropDownMenuOverlay
                    entries={this.state.entries}
                    selectedIndex={this.state.selectedIndex} />
    }

    render() {
        let selectedEntry = this.state.entries[this.state.selectedIndex],
            text = selectedEntry ? selectedEntry.text : '';

        return (
            <div className={classNames({
                    'KNDropDownMenu': true,
                    'is-disabled': this.props.disabled
                })}
                onClick={(ev) => this._onClick(ev)}>
                <span className="KNDropDownMenu__text">
                    {text}
                </span>
                <div className="KNDropDownMenu__iconBox">
                    <svg className="KNDropDownMenu__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </div>
            </div>
        )
    }
}

KNDropDownMenu.propTypes = {
    entries: PropTypes.array,
    values: PropTypes.array,
    selectedIndex: PropTypes.number,
    disabled: PropTypes.boolean
}
