import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import AuthenticationModal from '../AuthenticationModal/AuthenticationModal';
import { clearErrors, logoutUser } from '../../store/actions/index';


import './Navbar.css';

const Navbar = props => {

    const [isDisplayAuthModal, setIsDisplayAuthModal] = useState(false);
    const [hasUserLoggedOut, sethasUserLoggedOut] = useState(false);

    // Redux Import
    const dispatch = useDispatch();
    const onClearErrors = () => dispatch(clearErrors());
    const onLogout = () => dispatch(logoutUser());

    const isAuthenticated = useSelector(state => {
        return state.authReducer.isAuthenticated
    });
    
    const onCloseModal = () => {
        setIsDisplayAuthModal(false);
        onClearErrors();
    }

    const onLogoutHandler = () => {
        onLogout();
        sethasUserLoggedOut(true);
    }

    const authenticationButton = isAuthenticated ?
        <button className="Navbar__NavLinkButton" onClick={onLogoutHandler}>Logout</button> :
        <button className="Navbar__NavLinkButton" onClick={() => setIsDisplayAuthModal(true)}>Login</button>

    const redirect = hasUserLoggedOut ? <Redirect to='/'></Redirect> : null;

    return (
        <Fragment>
            {redirect}
            <nav className="Navbar__main">
                <div className="Navbar__contentDiv">
                    <p className="Navbar__title">I <FontAwesomeIcon icon={faHeart} size="2x" className="Navbar__icon"/> FLASHCARDS</p>
                </div>
                <div className="Navbar__contentDiv">
                    <NavLink to='/' exact className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Home</NavLink>
                    <NavLink to='/explore' className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Explore</NavLink>
                    {authenticationButton}
                </div>
                {isDisplayAuthModal ? <AuthenticationModal onCloseModal={onCloseModal}></AuthenticationModal> : null}
            </nav>
        </Fragment>
    );
}

export default Navbar;
