import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { fetchActiveSet } from '../../../store/actions/index';
import CardPlaceholder from '../../CardPlaceholder/CardPlaceholder';
import NewCardModal from '../../UI/NewCardModal/NewCardModal';
import BackdropModal from '../../UI/BackdropModal/BackdropModal';
import './CardSetPage.css'

const CardSetPage = props => {

    // Import Redux
    const dispatch = useDispatch();
    const onFetchActiveSet = reqURL => dispatch(fetchActiveSet(reqURL))

    const activeSet = useSelector(state => {
        return state.cardSetReducer.activeSet
    });

    const isFetchingActiveSet = useSelector(state => {
        return state.cardSetReducer.isFetchingActiveSet
    });

    const history = useHistory();
    const reqURL = '/api' + history.location.pathname;

    const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);

    useEffect(() => {
        onFetchActiveSet(reqURL);
    }, []);

    const onAddNewCardClick = () => {
        setIsNewCardModalOpen(true);
    }

    let content = null;
    if (isFetchingActiveSet) {
        content = <p>Loading...</p>
    } else {
        if (activeSet) {

            let cardsToShow = activeSet.cards.map(card => {
                return (
                    <CardPlaceholder key={Math.random()} cardContent={card}></CardPlaceholder>
                )
            });

            content = (
                <Fragment>
                    <div className="CardSetPage__setInfo">
                        <p className="CardSetPage__setTitle">{activeSet.name}</p>
                        <div className="CardSetPage__setAdditinalInfo">
                            <div className="CardSetPage__setAdditinalInfo__Author">
                                <p>Made by</p>
                                <p>{activeSet.author.authorUsername}</p>
                            </div>
                            <p className="CardSetPage__setAdditinalInfo__Description">{activeSet.description}</p>
                            <p>{activeSet.cards.length} Cards in the deck</p>
                        </div>
                    </div>
                    <div className="CardSetPage__cardsDiv">
                        <div className="CardSetPage__addNewCardDiv">
                            <FontAwesomeIcon icon={faPlusCircle} size="2x" className="CardSetPage__addNewCardButton" onClick={onAddNewCardClick} />
                        </div>
                        {cardsToShow}
                    </div>
                </Fragment>
            )
        }
    }

    let newCardModal = null;
    if (isNewCardModalOpen) {
        newCardModal = (
            <Fragment>
                <NewCardModal onCloseModal={() => setIsNewCardModalOpen(false)} />
                <BackdropModal backdropClicked={() => setIsNewCardModalOpen(false)}></BackdropModal>
            </Fragment>
        )
    }

    return (
        <div className="CardSetPage__mainDiv">
            {content}
            {newCardModal}
        </div>
    );
}

export default CardSetPage;
