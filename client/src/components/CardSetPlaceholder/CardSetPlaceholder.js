import React from 'react';

import './CardSetPlaceholder.css';

const CardSetPlaceholder = props => {

    return (
        <div className="CardSetPlaceholder__mainDiv">
            <p>{props.setInfo.setName}</p>
            <p>{props.setInfo.setCardAmount}</p>
            <p>{props.setInfo.setID}</p>
        </div>
    )

}

export default CardSetPlaceholder;