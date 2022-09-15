"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.db = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = _mongoose.default.connection;
exports.db = db;

const connectDB = async () => {
  try {
    const conn = await _mongoose.default.connect(process.env.MONGO_URI, {
      // must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log(`mongo database is connected!!! ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); // passing 1 - will exit the proccess with error
  }
};

var _default = connectDB; // Models
// require('./categoryModel')
// require('./userModel')
// require('./contactModel')

exports.default = _default;