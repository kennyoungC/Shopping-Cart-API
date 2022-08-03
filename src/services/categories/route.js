import express from "express"
import categoriesHandler from "./controller.js"

const router = express.Router()

router.route("/").get(categoriesHandler.getAllCategories)

router.post("/bulkCreate", categoriesHandler.createNewCategory)

export default router
