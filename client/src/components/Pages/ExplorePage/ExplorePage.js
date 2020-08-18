import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardPlaceholder from '../../CardPlaceholder/CardPlaceholder';
import CardSetPlaceholder from '../../CardSetPlaceholder/CardSetPlaceholder';
import { fetchPopularItems } from '../../../store/actions/index';
import './ExplorePage.css';

const ExplorePage = () => {

    // Component State
    const [showSets, setShowSets] = useState(true); // showSets is true when sets are shown and false when cards are shown

    // Redux Import
    const dispatch = useDispatch();
    const onFetchPopularItems = useCallback(() => dispatch(fetchPopularItems()), []);

    const popularCards = useSelector(state => {
        return state.explorePageReducer.popularCards
    });

    const popularSets = useSelector(state => {
        return state.explorePageReducer.popularSets
    });

    const error = useSelector(state => {
        return state.explorePageReducer.error
    });

    const isFetchingLoading = useSelector(state => {
        return state.explorePageReducer.isFetchingLoading
    });

    useEffect(() => {
        onFetchPopularItems();
    }, [onFetchPopularItems]);

    let toShow = null;
    let contentDivClasses = ""
    if (isFetchingLoading) {
        toShow = <p>Loading...</p>
        contentDivClasses = "ExplorePage__ShowLoadingDiv";
    } else {
        if (showSets) {
            contentDivClasses = "ExplorePage__ShowSetsDiv";
            toShow = popularSets.map(set => {
                return (
                    <CardSetPlaceholder key={set.setID} setInfo={set}></CardSetPlaceholder>
                )
            });
        } else {
            contentDivClasses = "ExplorePage__ShowCardsDiv";
            toShow = popularCards.map(card => {
                return (
                    <CardPlaceholder key={Math.random()} cardContent={card}></CardPlaceholder>
                )
            });
        }
    }

    return (
        <div className="ExplorePage__MainDiv">
            <div className="ExplorePage__ButtonDiv">
                <p onClick={() => setShowSets(false)} className={showSets ? null : "ExplorePage__ActiveButton"}>Popular Cards</p>
                <p onClick={() => setShowSets(true)} className={showSets ? "ExplorePage__ActiveButton" : null}>Popular Sets</p>
            </div>
            <div className={contentDivClasses}>
                {toShow}
            </div>
        </div>
    )
}

export default ExplorePage;