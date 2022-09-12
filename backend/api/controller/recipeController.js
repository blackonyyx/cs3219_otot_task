import Category from "../model/categoryModel.js"
import { Recipe } from "../model/recipeModel.js"
/**
 * Get /
 * Homepage
 */

export const homepage = async (req, res) => {
  try {
    const limit = 5
    const categories = await Category.find({}).limit(limit)
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limit)
    const thai = await Recipe.find({ category: "Thai" }).limit(limit)
    const american = await Recipe.find({ category: "American" }).limit(limit)
    const chinese = await Recipe.find({ category: "Chinese" }).limit(limit)
    const pack = {
      data: {
        category: categories,
        recipe: [latest, thai, american, chinese],
      },
    }
    return res.status(200).json(pack)
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || " Error Occurred!" })
  }
}

export const exploreCategories = async (req, res) => {
  try {
    const limit = 5
    const categories = await Category.find({}).limit(limit)
    return res.status(200).json({
      data: {
        category: categories,
      },
    })
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || " Error Occurred!" })
  }
}

/**
 * GET /categories/:id
 * Categories By Id
 */
export const exploreCategoriesById = async function exploreCategoriesById(
  req,
  res
) {
  try {
    const categoryId = req.params.id
    const limitNumber = 20
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    )
    return res.status(200).json({
      data: { category: categoryById },
    })
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Occurred" })
  }
}

/**
 * GET /recipe/:id
 * Recipe
 */
export const exploreRecipe = async function exploreRecipe(req, res) {
  try {
    const recipeId = req.params.id
    const recipeFound = await Recipe.findById(recipeId)
    return res.status(200).json({ data: { recipe: recipeFound } })
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Occurred" })
  }
}

/**
 * POST /search
 * Search
 */
export const searchRecipe = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm
    const recipeFound = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    })
    return res.status(200).json({
      data: { recipe: recipeFound },
    })
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Occurred" })
  }
}

/**
 * GET /explore-latest
 * Explplore Latest
 */
export const exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20
    const recipeFound = await Recipe.find({})
      .sort({ _id: -1 })
      .limit(limitNumber)
    return res.status(200).json({
      data: { recipe: recipeFound },
    })
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Occurred" })
  }
}

/**
 * GET /explore-random
 * Explore Random as JSON
 */
export const exploreRandom = async (req, res) => {
  try {
    const count = await Recipe.find().countDocuments()
    const random = Math.floor(Math.random() * count)
    const recipeFound = await Recipe.findOne().skip(random).exec()
    return res.status(200).json({
      data: { recipe: recipeFound },
    })
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Occurred" })
  }
}

/**
 * GET /submit-recipe
 * Submit Recipe
 */
export const submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors")
  const infoSubmitObj = req.flash("infoSubmit")
  return res.json({
    data: [infoErrorsObj, infoSubmitObj],
  })
}

/**
 * POST /submit-recipe
 * Submit Recipe
 */
export const submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile
    let uploadPath
    let newImageName

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No Files where uploaded.")
    } else {
      imageUploadFile = req.files.image
      newImageName = Date.now() + imageUploadFile.name

      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err)
        }
      })
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    })

    await newRecipe.save()

    req.flash("infoSubmit", "Recipe has been added.")
    res.redirect("/submit-recipe")
  } catch (error) {
    // res.json(error);
    req.flash("infoErrors", error)
    res.redirect("/submit-recipe")
  }
}

export const deleteRecipe = async (req, res) => {
  console.log(`Deleting note ${req.params.recipe_id}`)

  try {
    await Recipe.deleteOne({ _id: req.params.recipe_id })
    return res.json({
      recipe_id: req.params.recipe_id,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export const clearAllRecipes = function (req, res) {
  console.log("Clearing all recipes")
  try {
    Recipe.deleteMany()
    return res.status(200).send()
  } catch (error) {
    console.warn("Clearing all recipes failed!")
    return res.status(500).send(error)
  }
}
