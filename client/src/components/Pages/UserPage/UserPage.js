import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import store from '../../../store/store';
import { loadUser } from '../../../store/actions/index';
import CreateNewSetModal from '../../UI/CreateNewSetModal/CreateNewSetModal';
import UserCardSetPlaceholder from '../../UserCardSetPlaceholder/UserCardSetPlaceholder';
import './UserPage.css';

const UserPage = () => {

        // State definition
        const [shouldDisplaySetModal, setshouldDisplaySetModal] = useState(false);

        // Redux Import 
        const dispatch = useDispatch();

        const userInfo = useSelector(state => {
            return state.authReducer.user
        });

        const userSets = useSelector(state => {
            return state.cardSetReducer.userSets
        });

        useEffect(() => {
            store.dispatch(loadUser());
        }, []);

        const history = useHistory();

        let pageContent = null;
        if (userInfo) {

            let cardsCount = 0;
            let totalPopularity = 0;
            for (let cardSetIndex in userSets) {
                cardsCount = cardsCount + userSets[cardSetIndex].cards.length;
                totalPopularity = totalPopularity + userSets[cardSetIndex].popularity;
            }

            pageContent = ( <
                Fragment >
                <
                div className = "UserPage__userInfoDiv" >
                <
                div className = "UserPage__userImage" > < FontAwesomeIcon icon = { faUser }
                size = "2x"
                className = "Navbar__icon" / > < /div> <
                p className = "UserPage__userInfo" > { userInfo.username } < /p> <
                div className = "UserPage__stats" >
                <
                div >
                <
                p > Card Sets < /p> <
                p > { userInfo ? userInfo.cardSets.length : null } < /p> <
                /div> <
                div >
                <
                p > Cards Created < /p> <
                p > { cardsCount } < /p> <
                /div> <
                div >
                <
                p > Total Popularity < /p> <
                p > { totalPopularity } < /p> <
                /div> <
                /div> <
                /div> <
                div className = "UserPage__contentDiv" >
                <
                h2 > Your Collections < /h2> <
                div className = "UserPage__createSetButton"
                onClick = {
                    () => setshouldDisplaySetModal(true) } >
                <
                p > { userSets.length === 0 ? "Create your first set" : "Create a new set" } < /p> <
                /div> <
                div className = "UserPage__cardSets" > {
                    userSets.map(set => {
                        return ( <
                            div key = {set._id } >
                            <
                            UserCardSetPlaceholder setInfo = {set }
                            clicked = {
                                () => history.push('/cardSets/' + set._id) }
                            /> <
                            /div>
                        )
                    })
                } <
                /div> <
                /div> <
                /Fragment>
            )
        }

        return ( <
            div className = "UserPage__mainDiv" > { pageContent } {
                shouldDisplaySetModal ? < CreateNewSetModal onCloseModal = {
                    () => setshouldDisplaySetModal(false) }
                /> : null} <
                /div>
            );
        }

        export default UserPage;