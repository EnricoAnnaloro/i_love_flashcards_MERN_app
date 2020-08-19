import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButton from '../../UI/SubmitButton/SubmitButton';
import CancelButton from '../../UI/CancelButton/CancelButton';
import FormInput from '../../UI/FormInput/FormInput';
import { loginUser } from '../../../store/actions/index';
import { checkValidity } from '../../../utilityFunctions/modalUtility';

import './NewCardModal.css';

const NewCardModal = props => {

    // Component State
    const [modalForm, setModalForm] = useState({
        front: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Front content',
                userhelp: ''
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
            }
        },
        back: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Back content',
                userhelp: ''
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
            }
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Redux Import
    const dispatch = useDispatch();
    // const onUserLogin = userRegistrationInfo => dispatch(loginUser(userRegistrationInfo));

    const loginInputChangedHandler = (event, formElementID) => {

        const updatedForm = {
            ...modalForm
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

        setModalForm(updatedForm);
        setIsFormValid(isFormValid);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const newCardInfo = {
            front: modalForm.front.value,
            back: modalForm.back.value
        }

        // onUserLogin(newCardInfo);
    }

    const modalFormElements = [];
    for (let key in modalForm) {
        modalFormElements.push({
            id: key,
            config: modalForm[key]
        })
    }

    let modalFormDisplayed = (<form className="NewCardModal__formDiv" onSubmit={onSubmitHandler}>
        {modalFormElements.map(element => {
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
        <div className="NewCardModal__formButtons">
            <SubmitButton disabled={!isFormValid} >Add card!</SubmitButton>
            <CancelButton buttonClicked={props.onCloseModal} type="button">Cancel</CancelButton>
        </div>
    </form>);

    return (
        <div className="NewCardModal__mainDiv">
            <p className="NewCardModal__title">Add card to this set</p>
            {modalFormDisplayed}
        </div>
    );
}

export default NewCardModal;
