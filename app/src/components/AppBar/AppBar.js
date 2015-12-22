import './AppBar.scss'
import React, { PropTypes, Component } from 'react'

const AppBar = (props) => {
    return (
        <div className="AppBar">
    		<div className="AppBar__leftContainer">
                {props.left}
            </div>
    		<a className="AppBar__title"
                href={props.homeUrl}>
                {props.title}
            </a>
            <div className="AppBar__childContainer">
                {props.children}
            </div>
    		<div class="AppBar__rightContainer">
                {props.right}
    		</div>
        </div>
    )
};

AppBar.propTypes = {
    left: PropTypes.node,
    href: PropTypes.string,
    title: PropTypes.string.isRequired,
    right: PropTypes.node
};

export default AppBar
