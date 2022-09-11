// Import express
// import mongoose from 'mongoose'
// import template from './views/layouts/template.js'
// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import App from './app/index.js'
// import routes from './server/api-routes/recipeRoutes.js'
// import expressLayouts from 'express-ejs-layouts';
import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import compression from "compression"
import ssr from "./frontend/frontend-routes/ssr.js"
import recipeRoutes from "./api/api-routes/recipeRoutes.js"
import contactRoutes from "./api/api-routes/contributorRoutes.js"
// import errorController from "./api/error/errorController.js"
// import userRoutes from './server/api-routes/userRoutes.js'
import connectDB from "./api/model/db.js"
// import template from './views/layouts/template.js'
dotenv.config()
const app = express()

app.use(compression())
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
connectDB()
app.use("/assets", express.static("assets"))
// Initialise the app
// frontend
app.use("/", ssr)

// app.use(errorController)
// backend
app.use("/server/recipes", recipeRoutes)
app.use("/server/contributor", contactRoutes)
// app.use('/server/users', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`)
})

export default app
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

// app.use(bodyParser.json());

// // Use Api routes in the App
// app.use('/api', apiRoutes);
// // Launch app to listen to specified port
// app.listen(port, function () {
//     console.log("Running RestHub on port " + port);
// });
