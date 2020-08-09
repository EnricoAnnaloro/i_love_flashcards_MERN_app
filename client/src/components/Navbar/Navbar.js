import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = props => {
    return (
        <nav className="Navbar__main">
            <div className="Navbar__contentDiv">
                Logo and Title
            </div>
            <div className="Navbar__contentDiv">
                <p className="Navbar__NavLinkButton"><NavLink to='/'>home</NavLink></p>
                <p className="Navbar__NavLinkButton"><NavLink to='/explore'>explore</NavLink></p>
            </div>
        </nav>
    );
}

export default Navbar;
