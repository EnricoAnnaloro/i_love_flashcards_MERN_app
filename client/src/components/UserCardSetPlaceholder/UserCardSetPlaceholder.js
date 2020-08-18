import React from 'react';

import './UserCardSetPlaceholder.css';

const UserCardSetPlaceholder = props => {

    console.log(props.setInfo)

    return (
        <div className="UserCardSetPlaceholder__mainDiv" onClick={props.clicked}>
            <div className="UserCardSetPlaceholder__titlesDiv">
                <p>Title</p>
                <p>Popularity</p>
                <p>Author</p>
            </div>
            <div className="UserCardSetPlaceholder__infoDiv">
                <p>{props.setInfo.name}</p>
                <p>{props.setInfo.cards.length}</p>
                <p>{props.setInfo._id}</p>
            </div>
        </div>
    )

}

export default UserCardSetPlaceholder;