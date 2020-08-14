import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButton from '../../UI/SubmitButton/SubmitButton';
import CancelButton from '../../UI/CancelButton/CancelButton';
import FormInput from '../../UI/FormInput/FormInput';
import { loginUser } from '../../../store/actions/index';
import { checkValidity } from '../../../utilityFunctions/modalUtility';

import './LoginModal.css';

const LoginModal = props => {

    // Component State
    const [loginForm, setLoginForm] = useState({
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
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Redux Import
    const dispatch = useDispatch();
    const onUserLogin = userRegistrationInfo => dispatch(loginUser(userRegistrationInfo));

    const errorID = useSelector(state => {
        return state.errorReducer.id
    });

    const errorMessage = useSelector(state => {
        return state.errorReducer.msg
    });

    const loginInputChangedHandler = (event, formElementID) => {

        const updatedForm = {
            ...loginForm
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

        setLoginForm(updatedForm);
        setIsFormValid(isFormValid);
    }

    const onloginHandler = (event) => {
        event.preventDefault();

        const registrationInfo = {
            email: loginForm.email.value,
            password: loginForm.password.value
        }

        onUserLogin(registrationInfo);
    }

    const loginFormElements = [];
    for (let key in loginForm) {
        loginFormElements.push({
            id: key,
            config: loginForm[key]
        })
    }

    let loginFormDisplayed = (<form className="LoginModal__formDiv" onSubmit={onloginHandler}>
        {loginFormElements.map(element => {
            return (
                <FormInput
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.value}
                    valid={element.config.validity.isValid}
                    shouldValidate={element.config.validity.shouldValidate}
                    touched={element.config.validity.touched}
                    changed={(event) => loginInputChangedHandler(event, element.id)} />
            )
        })}
        <div className="LoginModal__formButtons">
            <SubmitButton disabled={!isFormValid} >Sign Up!</SubmitButton>
            <CancelButton buttonClicked={props.onCloseModal} type="button">Cancel</CancelButton>
        </div>
    </form>);

    const isError = errorID ?
        <div className="LoginModal__errorMessage"><p>{errorMessage}</p></div>
        : null

    return (
        <div className="LoginModal__mainDiv">
            <p className="LoginModal__title">Login</p>
            {isError}
            {loginFormDisplayed}
            <p className="LoginModal__linkToLogin">Not a user? <span onClick={props.onSwitchModal}>Register Form</span></p>
        </div>
    );
}

export default LoginModal;
