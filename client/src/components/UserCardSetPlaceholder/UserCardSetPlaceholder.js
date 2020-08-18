import React from 'react';

import './UserCardSetPlaceholder.css';

const UserCardSetPlaceholder = props => {

    console.log(props.setInfo)

    return (
        <div className="UserCardSetPlaceholder__mainDiv">
            <p>{props.setInfo.name}</p>
            <p>{props.setInfo.cards.length}</p>
            <p>{props.setInfo._id}</p>
        </div>
    )

}

export default UserCardSetPlaceholder;