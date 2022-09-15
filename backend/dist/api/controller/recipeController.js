"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitRecipeOnPost = exports.submitRecipe = exports.searchRecipe = exports.homepage = exports.exploreRecipe = exports.exploreRandom = exports.exploreLatest = exports.exploreCategoriesById = exports.exploreCategories = exports.deleteRecipe = exports.clearAllRecipes = void 0;

var _categoryModel = _interopRequireDefault(require("../model/categoryModel.js"));

var _recipeModel = require("../model/recipeModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get /
 * Homepage
 */
const homepage = async (req, res) => {
  try {
    const limit = 5;
    const categories = await _categoryModel.default.find({}).limit(limit);
    const latest = await _recipeModel.Recipe.find({}).sort({
      _id: -1
    }).limit(limit);
    const thai = await _recipeModel.Recipe.find({
      category: "Thai"
    }).limit(limit);
    const american = await _recipeModel.Recipe.find({
      category: "American"
    }).limit(limit);
    const chinese = await _recipeModel.Recipe.find({
      category: "Chinese"
    }).limit(limit);
    const pack = {
      data: {
        category: categories,
        recipe: [latest, thai, american, chinese]
      }
    };
    return res.status(200).json(pack);
  } catch (error) {
    return res.status(500).send({
      message: error.message || " Error Occurred!"
    });
  }
};

exports.homepage = homepage;

const exploreCategories = async (req, res) => {
  try {
    const limit = 5;
    const categories = await _categoryModel.default.find({}).limit(limit);
    return res.status(200).json({
      data: {
        category: categories
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || " Error Occurred!"
    });
  }
};
/**
 * GET /categories/:id
 * Categories By Id
 */


exports.exploreCategories = exploreCategories;

const exploreCategoriesById = async function exploreCategoriesById(req, res) {
  try {
    const categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await _recipeModel.Recipe.find({
      category: categoryId
    }).limit(limitNumber);
    return res.status(200).json({
      data: {
        category: categoryById
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Error Occurred"
    });
  }
};
/**
 * GET /recipe/:id
 * Recipe
 */


exports.exploreCategoriesById = exploreCategoriesById;

const exploreRecipe = async function exploreRecipe(req, res) {
  try {
    const recipeId = req.params.id;
    const recipeFound = await _recipeModel.Recipe.findById(recipeId);
    return res.status(200).json({
      data: {
        recipe: recipeFound
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Error Occurred"
    });
  }
};
/**
 * POST /search
 * Search
 */


exports.exploreRecipe = exploreRecipe;

const searchRecipe = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const recipeFound = await _recipeModel.Recipe.find({
      $text: {
        $search: searchTerm,
        $diacriticSensitive: true
      }
    });
    return res.status(200).json({
      data: {
        recipe: recipeFound
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Error Occurred"
    });
  }
};
/**
 * GET /explore-latest
 * Explplore Latest
 */


exports.searchRecipe = searchRecipe;

const exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipeFound = await _recipeModel.Recipe.find({}).sort({
      _id: -1
    }).limit(limitNumber);
    return res.status(200).json({
      data: {
        recipe: recipeFound
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Error Occurred"
    });
  }
};
/**
 * GET /explore-random
 * Explore Random as JSON
 */


exports.exploreLatest = exploreLatest;

const exploreRandom = async (req, res) => {
  try {
    const count = await _recipeModel.Recipe.find().countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipeFound = await _recipeModel.Recipe.findOne().skip(random).exec();
    return res.status(200).json({
      data: {
        recipe: recipeFound
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Error Occurred"
    });
  }
};
/**
 * GET /submit-recipe
 * Submit Recipe
 */


exports.exploreRandom = exploreRandom;

const submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  return res.json({
    data: [infoErrorsObj, infoSubmitObj]
  });
};
/**
 * POST /submit-recipe
 * Submit Recipe
 */


exports.submitRecipe = submitRecipe;

const submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No Files where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath = require("path").resolve("./") + "/public/uploads/" + newImageName;
      imageUploadFile.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    const newRecipe = new _recipeModel.Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    await newRecipe.save();
    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("/submit-recipe");
  } catch (error) {
    // res.json(error);
    req.flash("infoErrors", error);
    res.redirect("/submit-recipe");
  }
};

exports.submitRecipeOnPost = submitRecipeOnPost;

const deleteRecipe = async (req, res) => {
  console.log(`Deleting note ${req.params.recipe_id}`);

  try {
    await _recipeModel.Recipe.deleteOne({
      _id: req.params.recipe_id
    });
    return res.json({
      recipe_id: req.params.recipe_id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.deleteRecipe = deleteRecipe;

const clearAllRecipes = function (req, res) {
  console.log("Clearing all recipes");

  try {
    _recipeModel.Recipe.deleteMany();

    return res.status(200).send();
  } catch (error) {
    console.warn("Clearing all recipes failed!");
    return res.status(500).send(error);
  }
};

exports.clearAllRecipes = clearAllRecipes;