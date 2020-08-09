import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardPlaceholder from '../CardPlaceholder/CardPlaceholder';
import CardSetPlaceholder from '../CardSetPlaceholder/CardSetPlaceholder';
import { fetchPopularItems } from '../../store/actions/index'
import './ExplorePage.css';

const ExplorePage = () => {
    const [showSets, setShowSets] = useState(true); // showSets is true when sets are shown and false when cards are shown

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
    if (isFetchingLoading) {
        toShow = <p>Loading...</p>
    } else {
        if (showSets) {
            toShow = popularSets.map(set => {
                return (
                    <CardSetPlaceholder key={set.setID} setInfo={set}></CardSetPlaceholder>
                )
            });
        } else {
            toShow = popularCards.map(card => {
                return (
                    <CardPlaceholder key={Math.random()} cardContent={card}></CardPlaceholder>
                )
            });
        }
    }

    return (
        <div className="ExplorePage__MainDiv">
            <p>This is the explore page</p>
            <div className="ExplorePage__ButtonDiv">
                <button onClick={() => setShowSets(false)} className={showSets ? null : "ExplorePage__ActiveButton"}>Popular Cards</button>
                <button onClick={() => setShowSets(true)} className={showSets ? "ExplorePage__ActiveButton" : null}>Popular Sets</button>
            </div>
            <div className="ExplorePage__ShowItemsDiv">
                {toShow}
            </div>
        </div>
    )
}

export default ExplorePage;