import express from "express"

import productsHandler from "./controllers.js"

const router = express.Router()

router
  .route("/")
  .get(productsHandler.getAll)
  .post(productsHandler.createNewProduct)

router
  .route("/:id")
  .get(productsHandler.getProductById)
  .put(productsHandler.editProduct)
  .delete(productsHandler.deleteProduct)

router.get("/max", productsHandler.getMaxProd)

export default router
