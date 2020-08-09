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
        console.log(allCards);
        if (err) return res.status(400).json({ msg: "No card was found" });

        res.json({ cards: allCards });
    })
});

/*
    API ROUTE: /api/cards
    DESC: Add a new card to the system, must be inside a cardSet
    ACCESS: Private (to be done)
*/
router.post('/', (req, res) => {
    const frontContent = req.body.frontContent;
    const backContent = req.body.backContent;
    const setID = req.body.setID;

    const newCard = new Card({
        frontContent: frontContent,
        backContent: backContent
    });

    newCard.save()
        .then(async () => {
            foundCardSet = await CardSet.findById(setID);
            await foundCardSet.cards.push(newCard);
            await foundCardSet.save()
                .then(() => res.json({ msg: null }))
                .catch(error => res.status(400).json({ msg: "There was an error while updating the cardSet!" }))
        })
        .catch(error => res.status(400).json({ msg: "There was an error while creating your card!" }))
})

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