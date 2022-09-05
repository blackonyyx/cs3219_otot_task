// Import express
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
const app = express();
const port = process.env.PORT || 8080;

require('dotenv').config();

app.use(express.urlencoded({extended: true} ));
// resources
app.use(express.static('frontend'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



const routes = require('./server/api-routes/recipeRoutes.js');
app.use('/', routes);

const contactRoutes = require("./server/api-routes/contactRoutes.js");
app.use('/contacts', contactRoutes);

// Home page
app.get('/', (req, res) => res.send('Hello World with Express'));

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/cs3219_otot_task', { useNewUrlParser: true});
var db = mongoose.connection;


app.listen(port, () => {
    console.log("Running RestHub on port " + port);
});

// // Import routes
// let apiRoutes = require("./api-routes");
// // Configure bodyparser to handle post requests
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

// // Added check for DB connection
// if(!db)
//     console.log("Error connecting db")
// else
//     console.log("Db connected successfully")

// // Setup server port

// // Send message for default URL

// // Use Api routes in the App
// app.use('/api', apiRoutes);
// // Launch app to listen to specified port
// app.listen(port, function () {
//     console.log("Running RestHub on port " + port);
// });