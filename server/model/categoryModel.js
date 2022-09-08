// categoryModel.js
import mongoose from "mongoose";
// { Schema as _Schema, model }
// Setup Schema
const Schema = mongoose.Schema;

const categoryTestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const CategoryTest = mongoose.model("category", categoryTestSchema);
export default CategoryTest;
