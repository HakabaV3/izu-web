import './Input.scss'
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

const FocusState = {
    NONE: -1,
    FOCUS_IN: 0,
    FOCUS: 1,
    FOCUS_OUT: 2
};

export default class Input extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            focusState: FocusState.NONE
        };
    }

    get value() {
        return this.state.value;
    }

    set value(newVal) {
        this.setState({
            value: newVal
        });
    }

    _onFocus() {
        if (this.state.focusState !== FocusState.NONE) return;

        this.setState({
            focusState: FocusState.FOCUS_IN
        });

        setTimeout(() => {
            this.setState({
                focusState: FocusState.FOCUS
            });
        }, 240);
    }

    _onBlur() {
        if (this.state.focusState !== FocusState.FOCUS) return;

        this.setState({
            focusState: FocusState.FOCUS_OUT
        });

        setTimeout(() => {
            this.setState({
                focusState: FocusState.NONE
            });
        }, 240);
    }

    _onChange(ev) {
        this.setState({
            value: ev.target.value
        });
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(ev);
        }
    }

    render() {
        return (
            <div className={classNames({
                'Input': true,
                'is-focus':this.state.focusState === FocusState.FOCUS,
                'is-focusIn': this.state.focusState === FocusState.FOCUS_IN,
                'is-focusOut': this.state.focusState === FocusState.FOCUS_OUT,
                'is-empty': this.state.value === '',
            })}>
                <span className="Input__label">{this.props.label}</span>
        		<div className="Input__inner">
        			<input className="Input__input"
                        type={this.props.type}
                        value={this.state.value}
                        disabled={this.props.disabled}
                        onFocus={(ev) => this._onFocus(ev)}
                        onBlur={(ev) => this._onBlur(ev)}
                        onChange={(ev) => this._onChange(ev)}/>
        		</div>
        		<div className="Input__border"></div>
            </div>
        )
    }
}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.boolean
};
