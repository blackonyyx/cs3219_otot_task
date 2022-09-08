// Import express
// import mongoose from 'mongoose'
// import template from './views/layouts/template.js'
// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import App from './app/index.js'
// import routes from './server/api-routes/recipeRoutes.js'
// import expressLayouts from 'express-ejs-layouts';
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import compression from "compression";
import ssr from "./frontend/frontend-routes/ssr.js";
// import template from './views/layouts/template.js'
dotenv.config();
const app = express();

app.use(compression());
app.use(express.static("public"));

app.use("/assets", express.static("assets"));
// Initialise the app

app.use("/firstssr", ssr);

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
// resources
// app.use(expressLayouts);
// app.set('layout', './layouts/main');
// app.set('view engine', 'ejs');

// app.use('/', routes)

// app.use('/contacts', contactRoutes)

// Home page
// app.get('/', (req, res) => res.send('Hello World with Express'))

// Connect to Mongoose and set connection variable
// mongoose.connect('mongodb://localhost/cs3219_otot_task', { useNewUrlParser: true});
// var db = mongoose.connection;

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
