import React, { useState, useEffect } from 'react';

import './StudyCard.css';

const StudyCard = props => {

    

    let contentStyle = "StudyCard__cardContent";
    let cardStyle = "StudyCard__card";

    if (props.isCardRotated) {
        contentStyle = "StudyCard__cardContent Rotate";
        cardStyle = "StudyCard__cardShowBack"
    }

    return (
        <div className="StudyCard__mainDiv">
            <div className="StudyCard__progressionCounter">
                {props.progressionCounter+1}/{props.totalCards}
            </div>
            <div className={cardStyle}>
                <div className={contentStyle}>
                    <div className="StudyCard__cardFront">
                        <div className="StudyCard__wordContainer">
                            {props.cardContent.frontContent}
                        </div>
                    </div>
                    <div className="StudyCard__cardBack">
                        <div className="StudyCard__wordContainer">
                            {props.cardContent.backContent}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StudyCard;
