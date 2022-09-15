"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var recipeController = _interopRequireWildcard(require("../controller/recipeController.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();
/**
 * App routes
 */


router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to Recipes API!",
    routes: ["GET: /server/home", "GET/DELETE: /server/recipes/:id", "GET/POST/PUT/DELETE: /server/contacts/:contact_id"]
  });
});
router.route("/home").get(recipeController.homepage);
router.route("/recipe/:id").get(recipeController.exploreRecipe).delete(recipeController.deleteRecipe);
router.route("/categories").get(recipeController.exploreCategories);
router.route("/categories/:id").get(recipeController.exploreCategoriesById);
router.route("/search").post(recipeController.searchRecipe);
router.route("/explore-latest").get(recipeController.exploreLatest);
router.route("/explore-random").get(recipeController.exploreRandom);
router.route("/submit-recipe").get(recipeController.submitRecipe).post(recipeController.submitRecipeOnPost);
var _default = router;
exports.default = _default;