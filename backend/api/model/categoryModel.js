// categoryModel.js
import mongoose from "mongoose"
import validator from "validator"
// Setup Schema
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, "Must be a valid url to a online image."],
  }, // this is a id for getting specific recipe
  link: {
    type: String,
    require: true,
  },
})

const Category = mongoose.model("category", categorySchema)

export default Category
