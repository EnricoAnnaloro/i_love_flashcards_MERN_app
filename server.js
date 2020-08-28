const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

// mongodb://localhost/i_love_flashcards_app
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log("ERROR: ", err.message);
});

const dataBaseInit = require('./utility/databaseInit');
// dataBaseInit();

app.use('/api/cardSets', require('./routes/api/cardSets'));
app.use('/api/cards', require('./routes/api/cards'));
app.use('/api/users', require('./routes/api/users'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Starting on port: ${port}`);
});
