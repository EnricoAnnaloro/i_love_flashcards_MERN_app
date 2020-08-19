import React from 'react';

import './CardSetPlaceholder.css';

const CardSetPlaceholder = props => {

    return (
        <div className="CardSetPlaceholder__mainDiv">
            <div className="CardSetPlaceholder__titlesDiv">
                <p>Title</p>
                <p>Popularity</p>
                <p>Author</p>
            </div>
            <div className="CardSetPlaceholder__infoDiv">
                <p>{props.setInfo.setName}</p>
                <p>{props.setInfo.setCardAmount}</p>
                <p>{props.setInfo.setID}</p>
            </div>
        </div>
    )

}

export default CardSetPlaceholder;