// contactModel.js
import mongoose from "mongoose"
import validator from "validator"

// Setup Schema
const Schema = mongoose.Schema

const contributorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
    validate: [validator.isAlphanumeric, "Name must be a alphanumeric alias"],
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: [true, "Only one email can be registered for a account"],
    validate: [validator.isEmail, "Not a email so there"],
  },
  gender: String,
  phone: {
    type: String,
    required: false,
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
})

// Export contacts model
const Contributor = mongoose.model("contributor", contributorSchema)

Contributor.get = async (callback, limit) => {
  Contributor.find(callback).limit(limit)
}

export default Contributor
