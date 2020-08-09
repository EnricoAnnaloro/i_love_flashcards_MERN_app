const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    frontContent: {
        type: String,
        required: true
    },
    backContent: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card