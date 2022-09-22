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
import recipeRoutes from "./api/api-routes/recipeRoutes.js"
import contactRoutes from "./api/api-routes/contributorRoutes.js"
import cors from 'cors'
import connectDB from "./api/model/db.js"
// import template from './views/layouts/template.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(compression())
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
connectDB()
app.use("/assets", express.static("assets"))
// Initialise the app
// frontend
// app.use("/", ssr)

// app.use(errorController)
// backend
app.use("/server/recipes", recipeRoutes)
app.use("/server/contributor", contactRoutes)
// app.use('/server/users', userRoutes)
// console.log(process.env.PORT)
const port = process.env.PORT || 8000

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`)
})

export default app
