const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(bodyParser.json());

// deal with cross origin
mongoose.Promise = Promise;
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    next();
});



// connect to the MongoDB
mongoose.connect('mongodb://localhost:27017/catalogue', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((response) => {
        console.log('Connected to MongoDB!')
    })
    .catch(err => {
        console.error(`Error connecting to the MongoDB.\n${err}`)
    })



// client port
const PORT = process.env.PORT || '8000'

// listen to the client port
var listener = app.listen(PORT, () => {
    console.log('Listening on port ' + listener.address().port);
});



// var productsRouter = require('./controller/productController');

// app.use('/product', productsRouter);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to catalogue-server!<h1>');
});

module.exports = app;