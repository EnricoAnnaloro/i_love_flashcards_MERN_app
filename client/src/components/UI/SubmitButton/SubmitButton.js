import React from 'react'
import './SubmitButton.css'

const SubmitButton = (props) => {

    return(
        <button className="SubmitButton" disabled={props.disabled}>
                {props.children}
        </button>
    )
}

export default SubmitButton;