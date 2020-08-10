const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    cardSets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CardSet"
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;