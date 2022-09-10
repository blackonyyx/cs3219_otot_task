import express from "express";
import * as recipeController from "../controller/recipeController.js";
const router = express.Router();

/**
 * App routes
 */
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to Recipes API!",
    routes: [
      "GET: /server/home",
      "GET/DELETE: /server/recipes/:id",

      "GET/POST/PUT/DELETE: /server/contacts/:contact_id",
    ],
  });
});
router.route("/home").get(recipeController.homepage);
router
  .route("/recipe/:id")
  .get(recipeController.exploreRecipe)
  .delete(recipeController.deleteRecipe);
router.route("/categories").get(recipeController.exploreCategories);
router.route("/categories/:id").get(recipeController.exploreCategoriesById);
router.route("/search").post(recipeController.searchRecipe);
router.route("/explore-latest").get(recipeController.exploreLatest);
router.route("/explore-random").get(recipeController.exploreRandom);
router
  .route("/submit-recipe")
  .get(recipeController.submitRecipe)
  .post(recipeController.submitRecipeOnPost);

export default router;
