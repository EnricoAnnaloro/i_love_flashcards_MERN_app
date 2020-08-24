import React from 'react';

import './CardSetPlaceholder.css';

const CardSetPlaceholder = props => {

    console.log(props)

    return (
        <div className="CardSetPlaceholder__mainDiv" onClick={props.onClickSet}>
            <div className="CardSetPlaceholder__titlesDiv">
                <p>Title</p>
                <p>Popularity</p>
                <p>Author</p>
            </div>
            <div className="CardSetPlaceholder__infoDiv">
                <p>{props.setInfo.name}</p>
                <p>{props.setInfo.popularity}</p>
                <p>{props.setInfo.author.authorUsername}</p>
            </div>
        </div>
    )

}

export default CardSetPlaceholder;