import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 

import BackdropModal from '../../UI/BackdropModal/BackdropModal';
import './SideDrawer.css';

const SideDrawer = props => {

    const history = useHistory();

    // Redux Import 
    const isAuthenticated = useSelector(state => {
        return state.authReducer.isAuthenticated
    });   

    const user = useSelector(state => {
        return state.authReducer.user
    });

    let sideDrawerClasses = "Open";
    if (!props.isOpen) {
        sideDrawerClasses = "Close"
    }

    const onLoginModalOpen = () => {
        props.displayAuthModal();
        props.onCloseSideDrawer();
    }
    
    const onLogoutHandler = () => {
        props.onLogoutHandler();
        props.onCloseSideDrawer();        
    }

    let username = null;
    let moveToUserPage = null;
    if (isAuthenticated) {
        
        username = user.username;
    
        moveToUserPage = () => {
            history.push(`/user/${username}`);
            props.onCloseSideDrawer();
        }        
    }


    const authenticationButton = isAuthenticated ?
        <Fragment>
            <button className="SideDrawer__LinkButton" onClick={moveToUserPage}>UserPage</button>
            <button className="SideDrawer__LinkButton" onClick={onLogoutHandler}>Logout</button>
        </Fragment> :
        <button className="SideDrawer__LinkButton" onClick={onLoginModalOpen}>Login</button>
    
    const userGreeting = isAuthenticated ?
        <div className="SideDrawer__greting">
            <p>Welcome</p>
            <p>{username}</p>
        </div> :
        null;

    return (
        <Fragment>
            <BackdropModal backdropClicked={props.onCloseSideDrawer} />
            <div className={["SideDrawer", sideDrawerClasses].join(' ')}>
                <div>
                    <p className="SideDrawer__Title">I <FontAwesomeIcon icon={faHeart} className="Navbar__icon" /> FLASHCARDS</p>
                </div>
                {userGreeting}
                <div className="SideDrawer__buttons">
                    <NavLink to='/' exact className="SideDrawer__LinkButton" activeClassName="SideDrawer__LinkButtonActive" onClick={props.onCloseSideDrawer}>Home</NavLink>
                    <NavLink to='/explore' className="SideDrawer__LinkButton" activeClassName="SideDrawer__LinkButtonActive" onClick={props.onCloseSideDrawer}>Explore</NavLink>
                    {authenticationButton}
                </div>
            </div>
        </Fragment>
    );
}

export default SideDrawer;
