"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// contactModel.js
// Setup Schema
const Schema = _mongoose.default.Schema;
const contributorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
    validate: [_validator.default.isAlphanumeric, "Name must be a alphanumeric alias"]
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: [true, "Only one email can be registered for a account"],
    validate: [_validator.default.isEmail, "Not a email so there"]
  },
  gender: String,
  phone: {
    type: String,
    required: false,
    validate: [_validator.default.isMobilePhone, "Not a valid phone number"]
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  update_date: {
    type: Date,
    default: Date.now
  },
  userDescription: String
}); // Export contacts model

const Contributor = _mongoose.default.model("contributor", contributorSchema);

Contributor.get = async (callback, limit) => {
  Contributor.find(callback).limit(limit);
};

var _default = Contributor;
exports.default = _default;