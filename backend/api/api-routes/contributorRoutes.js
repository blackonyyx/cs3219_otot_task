import * as contactController from "../controller/contributorController.js"

import Router from "express"

const router = Router()
// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to Contacts API!",
    root: "/server/contributor",
    routes: [
      "GET/POST: /contributor",
      "GET/POST/PUT/DELETE: contributor/:contributor_id",
    ],
  })
})

router
  .route("/contributor")
  .get(contactController.showAllContributor)
  .post(contactController.createContributor)

router
  .route("/contributor/:contributor_id")
  .get(contactController.viewContributor)
  .patch(contactController.updateContributor)
  .put(contactController.updateContributor)
  .delete(contactController.deleteContributor)

// Export API routes
export default router
