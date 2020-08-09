const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/i_love_flashcards_app", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log("ERROR: ", err.message);
});

const dataBaseInit = require('./utility/databaseInit');
// dataBaseInit();

app.use('/api/cardSet', require('./routes/api/cardSets'));
app.use('/api/card', require('./routes/api/card'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Starting on port: ${port}`);
});
