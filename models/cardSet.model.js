const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cards: [Object]
}, { timestamps: true });

const CardSet = mongoose.model('CardSet', cardSetSchema);

module.exports = CardSet;