import React, { useState, useEffect, Fragment } from 'react';
import StudyCard from '../../StudyCard/StudyCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import './StudySetModal.css';

const StudySetModal = props => {

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [randomSequence, setRandomSequence] = useState([]);
    const [isCardRotated, setIsCardRotated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const generateRandomSequence = cardNum => {
        let randomSequenceToGenerate = [];
        for (let index in props.cards) {
            let indexToAdd = Math.floor(Math.random() * Math.floor(cardNum));

            while (randomSequenceToGenerate.includes(indexToAdd)) {
                indexToAdd = (indexToAdd + 1) % cardNum;
                console.log(indexToAdd)
            }

            randomSequenceToGenerate.push(indexToAdd);
        }

        return randomSequenceToGenerate;
    }

    useEffect(() => {
        setRandomSequence(generateRandomSequence(props.cards.length));
        setIsLoading(false);
    }, []);

    const goBackHandler = () => {
        setIsCardRotated(false);
        setTimeout(() => setCurrentCardIndex(currentCardIndex - 1), 800);        
    }

    const goForwardHandler = () => {
        setIsCardRotated(false);
        setTimeout(() => setCurrentCardIndex(currentCardIndex + 1), 800);    
    }

    let content = <p>Loading...</p>
    if (!isLoading) {
        content = (
            <div className="StudySetModal__card">
                <StudyCard
                    cardContent={props.cards[randomSequence[currentCardIndex]]}
                    progressionCounter={currentCardIndex}
                    totalCards={props.cards.length}
                    isCardRotated={isCardRotated}
                />
                <div className="StudyCard__rotateButton" onClick={() => setIsCardRotated(!isCardRotated)}>
                    <FontAwesomeIcon icon={faSyncAlt} size="2x" className="StudyCard__RotateCardButton" />
                </div>
            </div>
        )
    }

    console.log(currentCardIndex)

    return (
        <div className="StudySetModal__mainDiv">
            <button className="StudySetModal__navigationButton" onClick={goBackHandler} disabled={currentCardIndex == 0}>
                <FontAwesomeIcon icon={faArrowLeft} size="2x" className="StudySetModal____buttonIcon" />
            </button>
            {content}
            <button className="StudySetModal__navigationButton" onClick={goForwardHandler} disabled={currentCardIndex === props.cards.length-1}>
                <FontAwesomeIcon icon={faArrowRight} size="2x" className="StudySetModal____buttonIcon" />
            </button>
        </div>
    );
}

export default StudySetModal;
