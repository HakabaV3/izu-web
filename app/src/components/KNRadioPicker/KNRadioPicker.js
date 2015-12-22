import './KNRadioPicker.scss'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class KNRadioPicker extends Component {
    constructor() {
        super();
        this.state = {
            values: [],
            selectedIndex: -1
        };
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) {
        this.setState({
            values: props.values || [],
            selectedIndex: props.selectedIndex
        });
    }

    _onClickItem(ev, index) {
        this.setState({
            selectedIndex: index
        });
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(ev, index);
        }
    }

    render() {
        let items = this.state.values.map((value, i) => {
            return (
                <li className={classNames({
                        'KNRadioPicker__item': true,
                        'is-selected': i === this.state.selectedIndex
                    })}
                    key={i}
                    onClick={(ev) => this._onClickItem(ev, i)}>{value}</li>
            )
        });

        return (
            <ul className="KNRadioPicker">
                { items }
            </ul>
        );
    }
}

KNRadioPicker.propTypes = {
    values: PropTypes.array,
    onChange: PropTypes.func,
    selectedIndex: PropTypes.number,
};
