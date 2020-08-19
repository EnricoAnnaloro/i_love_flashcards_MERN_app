const router = require('express').Router();
const CardSet = require('../../models/cardSet.model.js');
const User = require('../../models/user.model.js');
const { set } = require('mongoose');

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
router.post('/', async (req, res) => {
    const name = req.body.setTitle;
    const description = req.body.setDescription;
    const userID = req.body.userID;
    const author = req.body.author;

    const newCardSetData = {
        name: name,
        description: description,
        author: {
            authorUsername: author,
            authorID: userID
        },
        cards: []
    }

    const newCardSet = new CardSet(newCardSetData);

    const savedCardSet = await newCardSet.save();
    if (!savedCardSet) return res.status(404).json({ msg: "There was an error accessing database" });

    let user = await User.findById(userID);
    if (!user) return res.status(404).json({ msg: "There was an error finding your data" });

    await user.cardSets.push(newCardSet._id);
    const savedUser = await user.save();
    if (!savedUser) return res.status(404).json({ msg: "There was an error accessing database" });

    // Successfull add
    return res.json({ msg: null });
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

/*
    API ROUTE: /api/cardSets/:id
    DESC: Find a single card set and return its content
    ACCESS: Private (to add)
*/
router.get('/:id', (req, res) => {
    const setID = req.params.id;
    console.log("setID", setID)

    CardSet.findById(setID)
        .then(foundSet => {
            return res.json({ set: foundSet });
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;