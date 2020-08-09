import React from 'react';

import './CardPlaceholder.css';

const CardPlaceholder = props => {

    return (
        <div className="Card__mainDiv">
            <p>{props.cardContent.frontContent}</p>
            <p>{props.cardContent.backContent}</p>
        </div>
    )

}

export default CardPlaceholder;