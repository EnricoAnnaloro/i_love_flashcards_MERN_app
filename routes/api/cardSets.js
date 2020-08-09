const router = require('express').Router();
const CardSet = require('../../models/cardSet.model.js');

/*
    API ROUTE: /api/cardSets
    DESC: Shows all CardSets
    ACCESS: Public
*/
router.get('/', (req, res) => {
    CardSet.find({}, (err, allSets) => {
        if (err) return res.status(400).json({ msg: "No CardSet was found" });

        // It is not needed the full content of the set in the main display page.
        // The content of the set is passed in the /api/cardSets/:id route
        const cardSets = [];
        for (cardSet in allSets) {
            cardSets.push({
                setName: allSets[cardSet].name,
                setCardAmount: allSets[cardSet].cards.length,
                setID: allSets[cardSet]._id
            })
        }

        res.json({ cardSets: cardSets });
    })
});

/*
    API ROUTE: /api/cardSets
    DESC: Import a single card set
    ACCESS: Private (to add)
*/
router.post('/', (req, res) => {
    const setName = req.body.setName;

    const newCardSetData = {
        name: setName,
        cards: []
    }

    const newCardSet = new CardSet(newCardSetData);

    newCardSet.save()
        .then(() => res.json({ msg: "New cardSet added succesfully" }))
        .catch(error => res.status(400).json({ msg: error }))
})

/*
    API ROUTE: /api/cardSets/:id
    DESC: Delete a single card set
    ACCESS: Private (to add)
*/
router.delete('/:id', (req, res) => {
    CardSet
        .findById(req.params.id)
        .then(orderToDelete => orderToDelete.remove().then(() => res.json({ msg: null })))
        .catch(error => res.status(404).json({ msg: error }));
});


module.exports = router;