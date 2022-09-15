"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _compression = _interopRequireDefault(require("compression"));

var _recipeRoutes = _interopRequireDefault(require("./api/api-routes/recipeRoutes.js"));

var _contributorRoutes = _interopRequireDefault(require("./api/api-routes/contributorRoutes.js"));

var _db = _interopRequireDefault(require("./api/model/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import express
// import mongoose from 'mongoose'
// import template from './views/layouts/template.js'
// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import App from './app/index.js'
// import routes from './server/api-routes/recipeRoutes.js'
// import expressLayouts from 'express-ejs-layouts';
// import errorController from "./api/error/errorController.js"
// import userRoutes from './server/api-routes/userRoutes.js'
// import template from './views/layouts/template.js'
_dotenv.default.config();

const app = (0, _express.default)();
app.use((0, _compression.default)());
app.use(_express.default.static("public"));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
(0, _db.default)();
app.use("/assets", _express.default.static("assets")); // Initialise the app
// frontend
// app.use("/", ssr)
// app.use(errorController)
// backend

app.use("/server/recipes", _recipeRoutes.default);
app.use("/server/contributor", _contributorRoutes.default); // app.use('/server/users', userRoutes)
// console.log(process.env.PORT)

const port = process.env.PORT || 8000;
app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
var _default = app;
exports.default = _default;