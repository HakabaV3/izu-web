import './Card.scss';
import React from 'react';

const Card = (props) => {
    let title = props.title,
        titleNode = null;

    if (title) {
        titleNode = (<header className="Card__title">{title}</header>)
    }

    return (
        <div className="Card">
            {titleNode}
            {props.children}
        </div>
        );
}

export default Card;
