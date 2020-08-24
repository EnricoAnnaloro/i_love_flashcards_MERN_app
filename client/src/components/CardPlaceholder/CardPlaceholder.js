import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './CardPlaceholder.css';

const CardPlaceholder = props => {

    return (
        <div className="Card__mainDiv">
            <p>{props.cardContent.frontContent}</p>
            <p>{props.cardContent.backContent}</p>
            {props.isEdit ? <FontAwesomeIcon icon={faMinusCircle} size="2x" className="Card__deleteButton" onClick={props.onRemoveCard}/>: null}
        </div>
    )

}

export default CardPlaceholder;