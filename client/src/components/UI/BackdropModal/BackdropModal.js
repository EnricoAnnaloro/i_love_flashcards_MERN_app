import React from 'react';
import './BackdropModal.css';

const BackdropModal = props => {
    return (
        <div className="BackdropModal__mainDiv" onClick={props.backdropClicked} />            
    );
}

export default BackdropModal;
