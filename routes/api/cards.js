const router = require('express').Router();
const Card = require('../../models/card.model');
const CardSet = require('../../models/cardSet.model');

/*
    API ROUTE: /api/cards
    DESC: Shows all cards
    ACCESS: Public
*/
router.get('/', (req, res) => {
    Card.find({}, (err, allCards) => {
        if (err) return res.status(400).json({ msg: "No card was found" });

        res.json({ cards: allCards });
    })
});

// /*
//     API ROUTE: /api/cards
//     DESC: Add a new card to the system, must be inside a cardSet
//     ACCESS: Private (to be done)
// */
// router.post('/', async (req, res) => {
//     const frontContent = req.body.frontContent;
//     const backContent = req.body.backContent;
//     const setID = req.body.setID;

//     const newCard = new Card({
//         frontContent: frontContent,
//         backContent: backContent
//     });

//     const cardSet = await CardSet.findById(setID);
//     if (!cardSet) return res.status(404).json({ msg: "There was an error accessing database" });
    
//     cardSet.cards.push(newCard);
    
//     const savedCardSet = await cardSet.save();
//     if (!savedCardSet) return res.status(404).json({ msg: "There was an error accessing database" });

//     const savedNewCard = await newCard.save();
//     if (!savedNewCard) return res.status(404).json({ msg: "There was an error accessing database" });

//     return res.json({ msg: null })
// })

/*
    API ROUTE: /api/cards/:id
    DESC: Delete a card from any set
    ACCESS: Private (to be done)
*/
router.post('/:id', (req, res) => {
    Card
        .findById(req.params.id)
        .then(orderToDelete => orderToDelete.remove().then(() => res.json({ msg: null })))
        .catch(error => res.status(404).json({ msg: "There was an error while deleting your card!" }));
})
module.exports = router;