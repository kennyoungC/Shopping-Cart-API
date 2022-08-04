import express from "express"
import categoriesHandler from "./controller.js"

const router = express.Router()

router.route("/").get(categoriesHandler.getAllCategories)
router
  .route("/:id")
  .get(categoriesHandler.editCategory)
  .put(categoriesHandler.editCategory)
  .delete(categoriesHandler.deleteCategory)

router.post("/bulkCreate", categoriesHandler.createNewCategory)

export default router
