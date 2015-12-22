import './KNDateRangePicker.scss'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import KNOverlayManager from 'components/KNOverlayManager/KNOverlayManager'

class KNDateRangePickerOverlay extends Component {
    _onBackGroundClick(ev) {
        if (ev.target !== this.refs.background) return;

        this.props.onBackGroundClick();
    }

    render() {
        return (
            <div className="KNDateRangePickerOverlay"
                ref="background"
                onClick={(ev) => this._onBackGroundClick(ev)}>
                <div className="KNDateRangePickerOverlay__base">
                    <table>
                        <thead>

                        </thead>
                        <tbody>
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

KNDateRangePickerOverlay.propTypes = {
    onBackGroundClick: PropTypes.func.isRequired
};

export default class KNDateRangePicker extends Component {
    constructor() {
        super();
        this.state = {
            values: [],
            selectedIndex: -1,
            layerId: null
        };
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {
        this.setState({});
    }

    overlayClose() {
        KNOverlayManager.close(this.state.layerId);
    }

    _onClick(ev) {
        this.setState({
            layerId: KNOverlayManager.open(this.renderOverlay())
        });
    }

    renderOverlay() {
        return (
            <KNDateRangePickerOverlay
            onBackGroundClick={() => this.overlayClose()}/>);
    }

    render() {
        return (
            <div className="KNDateRangePicker"
                onClick={ev => this._onClick(ev)}>
                未選択
            </div>
        );
    }
}

KNDateRangePicker.propTypes = {
};
