import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import './Navbar.css';

const Navbar = props => {

    console.log(props);

    return (
        <nav className="Navbar__main">
            <div className="Navbar__contentDiv">
                <p className="Navbar__title">I <FontAwesomeIcon icon={faHeart} size="2x" className="Navbar__icon"/> FLASHCARDS</p>
            </div>
            <div className="Navbar__contentDiv">
                <NavLink to='/' exact className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Home</NavLink>
                <NavLink to='/explore' className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Explore</NavLink>
                <NavLink to='/user' className="Navbar__NavLinkButton" activeClassName="Navbar__NavLinkButtonActive">Login</NavLink>

            </div>
        </nav>
    );
}

export default Navbar;
