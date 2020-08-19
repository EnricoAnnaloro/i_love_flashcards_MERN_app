import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

import AuthenticationModal from '../../AuthenticationModal/AuthenticationModal';
import UserInfoModal from '../../UI/UserInfoModal/UserInfoModal';
import SideDrawer from '../SideDrawer/SideDrawer';
import MenuIcon from '../MenuIcon/MenuIcon';
import { clearErrors, logoutUser } from '../../../store/actions/index';


import './Navbar.css';

const Navbar = props => {

    const [isDisplayAuthModal, setIsDisplayAuthModal] = useState(false);
    const [isDisplayUserInfoModal, setIsDisplayUserInfoModal] = useState(false);
    const [isDisplaySideDrawer, setIsDisplaySideDrawer] = useState(false);

    const history = useHistory();

    // Redux Import
    const dispatch = useDispatch();
    const onClearErrors = () => dispatch(clearErrors());
    const onLogout = () => dispatch(logoutUser());

    const isAuthenticated = useSelector(state => {
        return state.authReducer.isAuthenticated
    });

    const onCloseAuthModal = () => {
        setIsDisplayAuthModal(false);
        onClearErrors();
    }

    const onLogoutHandler = () => {
        setIsDisplayUserInfoModal(!isDisplayUserInfoModal);
        onLogout();
        history.push('/');
    }

    const toggleUserInfoModalHandler = () => {
        setIsDisplayUserInfoModal(!isDisplayUserInfoModal);
    }

    const authenticationButton = isAuthenticated ?
        <button className="Navbar__UserInfoButton" onClick={toggleUserInfoModalHandler}><FontAwesomeIcon icon={faUser} className="Navbar__icon" /></button> :
        <button className="Navbar__NavLinkButton" onClick={() => setIsDisplayAuthModal(true)}>Login</button>

    const userInfoModal = isDisplayUserInfoModal ? <UserInfoModal toggleUserInfoModalHandler={toggleUserInfoModalHandler} onLogoutHandler={onLogoutHandler} /> : null;

    const sideDrawer = isDisplaySideDrawer ?
        <SideDrawer
            isOpen={isDisplaySideDrawer}
            onCloseSideDrawer={() => setIsDisplaySideDrawer(false)}
            displayAuthModal={() => setIsDisplayAuthModal(true)}
            onLogoutHandler={onLogoutHandler}
        /> :
        null;

    return (
        <Fragment>
            <nav className="Navbar__main">
                <MenuIcon clicked={() => setIsDisplaySideDrawer(true)} />
                <div className="Navbar__titleDiv">
                    <p className="Navbar__title">I <FontAwesomeIcon icon={faHeart} size="2x" className="Navbar__icon" /> FLASHCARDS</p>
                </div>
                <div className="Navbar__contentDiv">
                    <NavLink to='/' exact className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Home</NavLink>
                    <NavLink to='/explore' className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Explore</NavLink>
                    {authenticationButton}
                </div>
                {isDisplayAuthModal ? <AuthenticationModal onCloseModal={onCloseAuthModal}></AuthenticationModal> : null}
            </nav>
            {userInfoModal}
            {sideDrawer}
        </Fragment>
    );
}

export default Navbar;
