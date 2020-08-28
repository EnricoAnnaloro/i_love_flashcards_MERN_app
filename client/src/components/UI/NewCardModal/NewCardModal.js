import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SubmitButton from '../../UI/SubmitButton/SubmitButton';
import CancelButton from '../../UI/CancelButton/CancelButton';
import FormInput from '../../UI/FormInput/FormInput';
import axios from '../../../axiosInstances/axios-api-setup';
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

    const history = useHistory();
    const reqURL = '/api' + history.location.pathname + '/new-card';

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
            frontContent: modalForm.front.value,
            backContent: modalForm.back.value,
            setID: props.setID
        }

        console.log(reqURL);

        axios.post(reqURL, newCardInfo)
            .then(res => {
                props.fetchRequest();
                props.onCloseModal();
            })
            .catch(err => {
                console.log(err);
            })
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
