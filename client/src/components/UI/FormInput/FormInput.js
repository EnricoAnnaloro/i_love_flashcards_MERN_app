import React from 'react';
import './FormInput.css'

const FormInput = (props) => {

    let inputElement = null;
    let userHelp = null;
    let styleClasses = "FormInputElement";

    if (!props.valid && props.shouldValidate && props.touched) {
        styleClasses = "FormInputElement Invalid"
        userHelp = props.elementConfig.userhelp ? <label style={{ fontSize: '10px' }}>{props.elementConfig.userhelp}</label> : null;
    }

    switch (props.elementType) {
        case "input":
            inputElement = <input className={styleClasses} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;

        case "textarea":
            inputElement = <textarea className={styleClasses} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;

        case "select":
            inputElement = (
                <select
                    className={styleClasses}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        )
                    })}
                </select>
            )
            break;

        default:
            inputElement = <input className={styleClasses} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
    }
    return (
        <div className="FormInput">
            <label className="FormInput__Label">{props.label}</label>
            {inputElement}
            {userHelp}
        </div>
    );
}

export default FormInput;
