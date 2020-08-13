import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButton from '../../UI/SubmitButton/SubmitButton';
import CancelButton from '../../UI/CancelButton/CancelButton';
import FormInput from '../../UI/FormInput/FormInput';
import { registerUser } from '../../../store/actions/index';

import './RegisterModal.css';

const RegisterModal = props => {

    // Component State
    const [registerForm, setRegisterForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                userhelp: 'Please enter a valid email'
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
                isEmail: true
            }
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
                userhelp: 'At least 7 character, with one number'
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
                minLength: 7,
                requiresNum: true,
            }
        },
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First Name',
                userhelp: ''
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true
            }
        },
        last_name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name',
                userhelp: ''
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true
            }
        }        
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Redux Import
    const dispatch = useDispatch();
    const onUserRegistration = userRegistrationInfo => dispatch(registerUser(userRegistrationInfo));

    const errorID = useSelector(state => {
        return state.errorReducer.id
    });

    const errorMessage = useSelector(state => {
        return state.errorReducer.msg
    });

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }


        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
        }

        if (rules.requiresNum && isValid) {
            isValid = /[1234567890]/g.test(value);
        }

        if (rules.requiresSpecialChar && isValid) {
            isValid = /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(value);
        }

        if (rules.isEmail && isValid) {
            isValid = /@/g.test(value);
        }

        return isValid;
    }

    const registerInputChangedHandler = (event, formElementID) => {

        const updatedForm = {
            ...registerForm
        };

        const updatedFormElement = {
            ...updatedForm[formElementID]
        };

        const updatedFormElementValidity = {
            ...updatedFormElement.validity
        }

        updatedFormElement.value = event.target.value;
        updatedFormElementValidity.isValid = checkValidity(updatedFormElement.value, updatedFormElementValidity);
        updatedFormElementValidity.touched = true;
        updatedFormElement.validity = updatedFormElementValidity;
        updatedForm[formElementID] = updatedFormElement;


        let isFormValid = true;
        for (let formIdentifier in updatedForm) {
            isFormValid = updatedForm[formIdentifier].validity.isValid && isFormValid;
        }

        setRegisterForm(updatedForm);
        setIsFormValid(isFormValid);
    }

    const onRegisterHandler = (event) => {
        event.preventDefault();

        const registrationInfo = {
            name: registerForm.name.value,
            last_name: registerForm.last_name.value,
            email: registerForm.email.value,
            password: registerForm.password.value
        }

        onUserRegistration(registrationInfo);
    }

    const registerFormElements = [];
    for (let key in registerForm) {
        registerFormElements.push({
            id: key,
            config: registerForm[key]
        })
    }

    let registerFormDisplayed = (<form className="RegisterModal__formDiv" onSubmit={onRegisterHandler}>
        {registerFormElements.map(element => {
            return (
                <FormInput
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.value}
                    valid={element.config.validity.isValid}
                    shouldValidate={element.config.validity.shouldValidate}
                    touched={element.config.validity.touched}
                    changed={(event) => registerInputChangedHandler(event, element.id)} />
            )
        })}
        <div className="RegisterModal__formButtons">
            <SubmitButton disabled={!isFormValid} >Sign Up!</SubmitButton>
            <CancelButton buttonClicked={props.onCloseModal} type="button">Cancel</CancelButton>
        </div>
    </form>);

    const isError = errorID ?
        <div className="RegisterModal__errorMessage"><p>{errorMessage}</p></div>
        : null

    return (
        <div className="RegisterModal__mainDiv">
            <p className="RegisterModal__title">Register</p>
            {isError}
            {registerFormDisplayed}
            <p className="RegisterModal__linkToLogin">Go back to <span onClick={props.onSwitchModal}>Login Form</span></p>
        </div>
    );
}

export default RegisterModal;
