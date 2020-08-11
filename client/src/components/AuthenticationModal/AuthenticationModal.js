import React, { useState } from 'react';

import BackdropModal from '../UI/BackdropModal/BackdropModal';
import LoginModal from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';

const AuthenticationModal = props => {

    const [isLoginModal, setIsLoginModal] = useState(true); // True for login, false for register

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
