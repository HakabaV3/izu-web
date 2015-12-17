import './Time.scss'
import React, { Component } from 'react'

export default props => {
    return (
        <span className="Time">
            <span className="Time__formaten">{(new Date(props.value)).toLocaleString()}</span>
            <code className="Time__original">{props.value/1000}</code>
        </span>
    )
}
