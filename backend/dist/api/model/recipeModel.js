"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recipe = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recipeSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: "This field is required."
  },
  description: {
    type: String,
    required: [true, "This field is required."]
  },
  email: {
    type: String,
    ref: "contributor",
    required: [true, "This field is required and is a foreign key."]
  },
  ingredients: {
    type: Array,
    required: [true, "This field is required."]
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
    required: [true, "This field is required."]
  },
  image: {
    type: String,
    required: [true, "This field is required."]
  }
}); // recipeSchema.index({ name: 'text', description: 'text' })
// WildCard Indexing
// recipeSchema.index({ "$**" : 'text' });

const Recipe = _mongoose.default.model("Recipe", recipeSchema);

exports.Recipe = Recipe;