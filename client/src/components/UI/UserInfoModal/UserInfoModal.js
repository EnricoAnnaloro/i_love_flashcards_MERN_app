import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import BackdropModal from '../BackdropModal/BackdropModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './UserInfoModal.css'

const UserInfoModal = props => {

    const history = useHistory();

    // Redux State
    const user = useSelector(state => {
        return state.authReducer.user
    });

    const moveToUserPage = () => {
        history.push(`/user/${user.username}`);
        props.toggleUserInfoModalHandler();
    }

    let userPageLink = null;
    if (history.location.pathname.substring(0, 5) !== '/user') {
        userPageLink = <div className="UserInfoModal__toUserPageDiv" onClick={moveToUserPage}>
            <p>Your Page</p>
        </div>
    }

    return (
        <Fragment>
            <div className="UserInfoModal__mainDiv">
                {user ? <p className="UserInfoModal__greeting">Welcome {user.username}!</p> : null}
                {userPageLink}
                <div className="UserInfoModal__logoutDiv" onClick={props.onLogoutHandler}>
                    <p>Logout<FontAwesomeIcon icon={faSignOutAlt} className="Navbar__icon" /></p>
                </div>
            </div>
            <BackdropModal backdropClicked={props.toggleUserInfoModalHandler} />
        </Fragment>
    );
}

export default UserInfoModal;
