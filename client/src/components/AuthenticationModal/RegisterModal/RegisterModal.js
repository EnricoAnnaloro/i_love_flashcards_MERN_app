import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import SubmitButton from '../../UI/SubmitButton/SubmitButton';
import CancelButton from '../../UI/CancelButton/CancelButton';
import FormInput from '../../UI/FormInput/FormInput';
import './RegisterModal.css';

const RegisterModal = props => {

    const [registerForm, setRegisterForm] = useState({
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
                userhelp: 'At least 7 character, with one number and one special character'
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
                minLength: 7,
                requiresNum: true,
                requiresSpecialChar: true,
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
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                userhelp: null
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

    // const dispatch = useDispatch();
    // const onUserRegistration = userRegistrationForm => dispatch(registerUser(userRegistrationForm));

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
        console.log("Helloooo")

        const registrationInfo = {
            password: registerForm.password.value,
            name: registerForm.name.value,
            last_name: registerForm.last_name.value,
            email: registerForm.email.value,
        }

        // onUserRegistration(registrationInfo);
    }

    const registerFormElements = [];
    for (let key in registerForm) {
        registerFormElements.push({
            id: key,
            config: registerForm[key]
        })
    }

    let registerFormDisplayed = (<form onSubmit={onRegisterHandler}>
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
        <CancelButton buttonClicked={props.onCloseModal}>Cancel</CancelButton>
        <SubmitButton disabled={!isFormValid} >Sign Up!</SubmitButton>
    </form>);

    return (
        <div className="RegisterModal__mainDiv">
            <p>Register</p>
            {registerFormDisplayed}
            <button onClick={props.onSwitchModal}>Login</button>
        </div>
    );
}

export default RegisterModal;
