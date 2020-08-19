import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axiosInstances/axios-api-setup';

import { fetchUserSets } from '../../../store/actions/index';
import { checkValidity } from '../../../utilityFunctions/modalUtility';
import BackdropModal from '../BackdropModal/BackdropModal';
import FormInput from '../FormInput/FormInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import CancelButton from '../CancelButton/CancelButton';

import './CreateNewSetModal.css';


const CreateNewSet = props => {

    // Redux imports
    const dispatch = useDispatch();
    const onFetchUserSets = () => dispatch(fetchUserSets());

    const user = useSelector(state => {
        return state.authReducer.user;
    });

    const [createSetForm, setCreateSetForm] = useState({
        setTitle: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Set Title',
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
            }
        },
        setDescription: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Brief Description of Your Set (optional)',
            },
            value: '',
            validity: {
                isValid: true,
                shouldValidate: false,
                touched: false
            }
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const creatNewSetInputChangedHandler = (event, formElementID) => {

        const updatedForm = {
            ...createSetForm
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

        setCreateSetForm(updatedForm);
        setIsFormValid(isFormValid);
    }

    const onCreateSetHandler = (event) => {
        event.preventDefault();

        const body = {
            setTitle: createSetForm.setTitle.value,
            setDescription: createSetForm.setDescription.value,
            userID: user._id,
            author: user.username
        }

        axios.post('/api/cardSets', body)
            .then(response => {
                console.log(response);
                onFetchUserSets();
                props.onCloseModal();
            })
            .catch(error => console.log(error));
    }

    const createSetFormElements = [];
    for (let key in createSetForm) {
        createSetFormElements.push({
            id: key,
            config: createSetForm[key]
        })
    }

    let createSetFormDisplayed = (<form className="CreateNewSet__formDiv" onSubmit={onCreateSetHandler}>
        {createSetFormElements.map(element => {
            return (
                <FormInput
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.value}
                    valid={element.config.validity.isValid}
                    shouldValidate={element.config.validity.shouldValidate}
                    touched={element.config.validity.touched}
                    changed={(event) => creatNewSetInputChangedHandler(event, element.id)} />
            )
        })}
        <div className="CreateNewSet__formButtons">
            <SubmitButton disabled={!isFormValid} >Create!</SubmitButton>
            <CancelButton buttonClicked={props.onCloseModal} type="button">Cancel</CancelButton>
        </div>
    </form>);



    return (
        <Fragment>
            <div className="CreateNewSet__mainDiv">
                <p className="CreateNewSet__title">Your New Set</p>
                {createSetFormDisplayed}
            </div>
            <BackdropModal backdropClicked={props.onCloseModal}></BackdropModal>
        </Fragment>
    );
}

export default CreateNewSet;
