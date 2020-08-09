const mongoose = require('mongoose');

const Card = require('../models/card.model');
const CardSet = require('../models/cardSet.model');

const inputDataCardSets = [ // Sample input for card sets
    {
        cardSetName: "First card set"
    },
    {
        cardSetName: "Second card set"
    },
    {
        cardSetName: "Third card set"
    },
]

const inputDataCards = [    // Sample input for cards
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
]

const databaseInit = async () => {
    await CardSet.deleteMany({}, (err) => { // Deleting all card sets in database
        if (err) {
            console.log(err);
        } else {
            console.log("All CardSet removed...");
        }
    });

    await Card.deleteMany({}, (err) => { // Deleting all cards in database
        if (err) {
            console.log(err);
        } else {
            console.log("All Cards removed...");
        }
    });

    let newCards = [];  // Creating an array with all the new stored cards in database
    inputDataCards.forEach(async card => {
        const newCardData = {
            frontContent: card.frontContent,
            backContent: card.backContent
        }

        const newCard = new Card(newCardData);
        newCards.push(newCard);
        
        await newCard.save().then(console.log(`Added card "${newCard._id}"`));
    })

    inputDataCardSets.forEach(async cardSet => { // Adding all default card sets to the database
        const newCardSetData = {
            name: cardSet.cardSetName,
            cards: []
        }

        const newCardSet = new CardSet(newCardSetData);

        await newCardSet.save().then(console.log(`Added card set "${newCardSet.name}"`));

        newCards.forEach( async newCard => {
            const cardSetToUpdate = await CardSet.findById(newCardSet._id);
            await cardSetToUpdate.cards.push(newCard);
            await cardSetToUpdate.save().then(console.log(`Added card "${newCard._id}" to card set "${cardSetToUpdate._id}"`));
        })
    });
};

module.exports = databaseInit;