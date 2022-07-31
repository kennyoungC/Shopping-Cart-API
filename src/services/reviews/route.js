import express from "express"
import revHandler from "./controllers.js"

const router = express.Router()

router.route("/").get(revHandler.getAll)
router
  .route("/:id")
  .post(revHandler.createNewReview)
  .get(revHandler.getSingleReview)
  .put(revHandler.editSingleReview)
  .delete(revHandler.deleteReview)

export default router
