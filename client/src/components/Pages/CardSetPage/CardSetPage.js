import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchActiveSet } from '../../../store/actions/index';
import axios from '../../../axiosInstances/axios-api-setup'
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

    useEffect(() => {
        onFetchActiveSet(reqURL);
    }, []);

    console.log(activeSet);

    let content = null;
    if (isFetchingActiveSet) {
        content = <p>Loading...</p>
    } else {
        if (activeSet) {
            content = (
                <div className="CardSetPage__setInfo">
                    <p className="CardSetPage__setTitle">{activeSet.name}</p>
                    <div className="CardSetPage__setAdditinalInfo">
                        <p>Made by: {activeSet.author.authorUsername}</p>
                        <p>{activeSet.description}</p>
                        <p>{activeSet.cards.length} Cards in the deck</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="CardSetPage__mainDiv">
            {content}
        </div>
    );
}

export default CardSetPage;
