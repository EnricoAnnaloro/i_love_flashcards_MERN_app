import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackdropModal from '../UI/BackdropModal/BackdropModal';
import LoginModal from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';

const AuthenticationModal = props => {

    const [isLoginModal, setIsLoginModal] = useState(true); // True for login, false for register

    const isAuthenticated = useSelector(state => {
        return state.authReducer.isAuthenticated
    });

    useEffect(() => {
        if (isAuthenticated) {
            props.onCloseModal();
        }
    }, [isAuthenticated]);

    let modalToShow = null;
    if (isLoginModal) {
        modalToShow = <LoginModal onSwitchModal={() => setIsLoginModal(false)} onCloseModal={props.onCloseModal}></LoginModal>
    } else {
        modalToShow = <RegisterModal onSwitchModal={() => setIsLoginModal(true)} onCloseModal={props.onCloseModal}></RegisterModal>
    }

    return (
        <div>
            {modalToShow}
            <BackdropModal backdropClicked={props.onCloseModal}></BackdropModal>
        </div>
    );
}

export default AuthenticationModal;
