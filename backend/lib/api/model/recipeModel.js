import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    required: [true, "This field is required."],
  },
  email: {
    type: String,
    ref: "contributor",
    required: [true, "This field is required and is a foreign key."],
  },
  ingredients: {
    type: Array,
    required: [true, "This field is required."],
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
    required: [true, "This field is required."],
  },
  image: {
    type: String,
    required: [true, "This field is required."],
  },
})

// recipeSchema.index({ name: 'text', description: 'text' })
// WildCard Indexing
// recipeSchema.index({ "$**" : 'text' });

export const Recipe = mongoose.model("Recipe", recipeSchema)
