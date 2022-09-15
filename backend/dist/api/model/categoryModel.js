"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// categoryModel.js
// Setup Schema
const Schema = _mongoose.default.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: [_validator.default.isURL, "Must be a valid url to a online image."]
  },
  // this is a id for getting specific recipe
  link: {
    type: String,
    require: true
  }
});

const Category = _mongoose.default.model("category", categorySchema);

var _default = Category;
exports.default = _default;