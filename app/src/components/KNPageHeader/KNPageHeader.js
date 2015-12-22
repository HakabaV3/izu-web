import './KNPageHeader.scss'
import React, { PropTypes } from 'react'

const KNPageHeader = (props) => {
    return (
        <header className="KNPageHeader">
            {props.title}
        </header>
    );
}
KNPageHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default KNPageHeader
