import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landingPage__mainDiv">
            <p>This is the landing page</p>
            <Link to='/explore'>explore</Link>
        </div>
    )
}

export default LandingPage;