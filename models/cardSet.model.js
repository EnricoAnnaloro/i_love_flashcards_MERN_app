const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cards: [Object],
    description: {
        type: String,
        default: "No description available"
    },
    popularity: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const CardSet = mongoose.model('CardSet', cardSetSchema);

module.exports = CardSet;