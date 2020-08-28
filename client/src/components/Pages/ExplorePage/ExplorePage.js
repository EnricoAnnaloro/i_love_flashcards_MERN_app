import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CardSetPlaceholder from '../../CardSetPlaceholder/CardSetPlaceholder';
import { fetchPopularItems } from '../../../store/actions/index';
import './ExplorePage.css';

const ExplorePage = () => {

    // Component State
    const [showSets, setShowSets] = useState(true); // showSets is true when sets are shown and false when search is ON

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

    const history = useHistory();

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
                    <CardSetPlaceholder key={set._id} setInfo={set} onClickSet={() => history.push('/cardSets/' + set._id)}></CardSetPlaceholder>
                )
            });
        } else {
            toShow = null; // TODO: ADD LOGIC FOR SEARCH SETS
        }
    }

    return (
        <div className="ExplorePage__MainDiv">
            <div className="ExplorePage__ButtonDiv">
                {showSets ? <p>Popular Sets</p> : null}
            </div>
            <div className={contentDivClasses}>
                {toShow}
            </div>
        </div>
    )
}

export default ExplorePage;