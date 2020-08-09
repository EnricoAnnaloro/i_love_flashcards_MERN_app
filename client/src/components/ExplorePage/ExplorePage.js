import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CardPlaceholder from '../CardPlaceholder/CardPlaceholder';
import CardSetPlaceholder from '../CardSetPlaceholder/CardSetPlaceholder';
import './ExplorePage.css';

const ExplorePage = () => {

    const [displayedCards, setDisplayedCards] = useState([    // Sample input for cards
        {
            frontContent: "Ciao",
            backContent: "Hello"
        },
        {
            frontContent: "Come stai?",
            backContent: "How are you?"
        },
        {
            frontContent: "Che bella giornata!",
            backContent: "What a beautiful day!"
        },
        {
            frontContent: "Ciao",
            backContent: "Hello"
        },
        {
            frontContent: "Come stai?",
            backContent: "How are you?"
        },
        {
            frontContent: "Che bella giornata!",
            backContent: "What a beautiful day!"
        }
    ]);

    const [displayedSets, setDisplayedSets] = useState([
        {
            setName: "First card set",
            setCardAmount: 4,
            setID: "5f2fc3325e014a1ab0378bb6"
        },
        {
            setName: "Second card set",
            setCardAmount: 3,
            setID: "5f2fc3325e014a1ab0378bb7"
        },
        {
            setName: "Third card set",
            setCardAmount: 3,
            setID: "5f2fc3325e014a1ab0378bb8"
        }
    ]);



    const cards = displayedCards.map(card => {
        return (
            <CardPlaceholder key={Math.random()} cardContent={card}></CardPlaceholder>
        )
    });

    const sets = displayedSets.map(set => {
        return (
            <CardSetPlaceholder key={set.setID} setInfo={set}></CardSetPlaceholder>
        )
    })


    return (
        <div className="ExplorePage__MainDiv">
            <p>This is the explore page</p>
            <Link to='/'>home</Link>
            <p>Popular Cards</p>
            <div className="ExplorePage__PlaceholdersDiv">
                {cards}
            </div>
            <p>Popular Sets</p>
            <div className="ExplorePage__PlaceholdersDiv">
                {sets}
            </div>
        </div>
    )
}

export default ExplorePage;