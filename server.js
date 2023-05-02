// import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');

// create an instance of Express app
const app = express();

// configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
const ProductModel = require('./model/Product');

// deal with cross origin
mongoose.Promise = Promise;
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    next();
});

// connect to the MongoDB and initial for new user
mongoose.connect('mongodb://localhost:27017/catalogue', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB!');

        // check if there are any products in the collection
        const product = await ProductModel.countDocuments();

        
        if(product > 0) {
            // data already exists, skip initial
            console.log("Data already exists, skipping initial.");
            return;
        }

        // initial data
        try {
            // load the products.json file
            const productsJson = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

            // insert the products into the collection
            await ProductModel.insertMany(productsJson.products);
            console.log("Data successfully initialised!");
        }catch (err) {
            console.error(`Error reading the products file: ${err}`);
        }
    })
    .catch(err => {
        console.error(`Error connecting to the MongoDB: ${err}`);
    });

// server initial page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the product catalogue server!<h1>');
});

// define routes using separate module
var productRouter = require('./controller/productController').router;

app.use('/api/product', productRouter);

// client port
const PORT = process.env.PORT || '8080';

// listen to the client port
var listener = app.listen(PORT, () => {
    console.log('Listening on port ' + listener.address().port);
});

module.exports = app;