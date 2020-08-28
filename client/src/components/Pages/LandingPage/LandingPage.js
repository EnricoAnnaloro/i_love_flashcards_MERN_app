import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useWindowScroll } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSdCard, faCopy, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

import LandingCoverImage from '../../../assets/landingCover.jpg'
import LandingCoverImageMobile from '../../../assets/landingCoverMobile.jpg'
import './LandingPage.css'

const LandingPage = () => {

    const history = useHistory();
    const { y: pageYOffset } = useWindowScroll();
    const [instructionsClassesLeft, setInstructionsClassesLeft] = useState("landingPage__InstructionsHidden");
    const [instructionsClassesRight, setInstructionsClassesRight] = useState("landingPage__InstructionsHidden");

    useEffect(() => {
        if (window.screen.availWidth < 768) {
            window.addEventListener("scroll", e => {
                if (window.scrollY > 100) {
                    setInstructionsClassesRight("landingPage__InstructionsRight");
                    setInstructionsClassesLeft("landingPage__InstructionsLeft");
                }
            });
        } else {
                setInstructionsClassesRight("landingPage__InstructionsRight");
                setInstructionsClassesLeft("landingPage__InstructionsLeft");
        }
    }, []);

    return (
        <div className="landingPage__mainDiv">
            <div className="landingPage__Jumbotron">
                <div className="landingPage__JumbotronTitle">
                    <h1>Study</h1>
                    <h1>Learn</h1>
                    <h1>Improve</h1>
                    <hr></hr>
                    <h4>The best site for learning with flashcards</h4>
                    <button className="landingPage__exploreButton" onClick={() => history.push('/explore')}>EXPLORE</button>
                    <p>Not a user? Log in to unleash the whole potential</p>
                </div>
                <div className="landingPage__JumbotronLayover"></div>
                <img className="landingPage__DesktopImg" src={LandingCoverImage}></img>                
                <img className="landingPage__MobileImg" src={LandingCoverImageMobile}></img>                
            </div>
            <div className="landingPage__container">
                <div className={instructionsClassesRight}>
                    <p>Create your sets</p>
                    <FontAwesomeIcon icon={faCopy} size="2x" className="Navbar__icon" />
                </div>
                <div className={instructionsClassesLeft}>
                    <p>Add cards</p>
                    <FontAwesomeIcon icon={faSdCard} size="2x" className="Navbar__icon" />
                </div>
                <div className={instructionsClassesRight}>
                    <p>Review and memorize</p>
                    <FontAwesomeIcon icon={faCodeBranch} size="2x" className="Navbar__icon" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;