// contactModel.js
import mongoose from "mongoose";
import validator from "validator";

// Setup Schema
const Schema = mongoose.Schema;

const contributorSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: [validator.isAlphanumeric, "Name must be a alphanumeric alias"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Only one email can be registered for a account"],
    validate: [validator.isEmail, "Not a email"],
  },
  gender: String,
  phone: {
    type: String,
    validate: [validator.isMobilePhone, "Not a valid phone number"],
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
  userDescription: String,
});

// Export contacts model
const Contributor = mongoose.model("contributor", contributorSchema);

Contributor.get = (callback, limit) => {
  Contributor.find(callback).limit(limit);
};

export default Contributor;
