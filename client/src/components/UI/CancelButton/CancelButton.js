import React from 'react'
import './CancelButton.css'

const CancelButton = (props) => {

    return(
        <button className="CancelButton" disabled={props.disabled} onClick={props.buttonClicked}>
                {props.children}
        </button>
    )
}

export default CancelButton;