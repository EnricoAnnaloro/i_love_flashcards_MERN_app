import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import AuthenticationModal from '../AuthenticationModal/AuthenticationModal';

import './Navbar.css';

const Navbar = props => {

    const [isDisplayAuthModal, setIsDisplayAuthModal] = useState(false);

    return (
        <nav className="Navbar__main">
            <div className="Navbar__contentDiv">
                <p className="Navbar__title">I <FontAwesomeIcon icon={faHeart} size="2x" className="Navbar__icon"/> FLASHCARDS</p>
            </div>
            <div className="Navbar__contentDiv">
                <NavLink to='/' exact className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Home</NavLink>
                <NavLink to='/explore' className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Explore</NavLink>
                <button to='/user' className="Navbar__NavLinkButton" onClick={() => setIsDisplayAuthModal(true)}>Login</button>
            </div>
            {isDisplayAuthModal ? <AuthenticationModal onCloseModal={() => setIsDisplayAuthModal(false)}></AuthenticationModal> : null}
        </nav>
    );
}

export default Navbar;
