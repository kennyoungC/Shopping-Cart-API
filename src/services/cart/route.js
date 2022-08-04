import express from "express"
import cartHandler from "./controllers.js"
const router = express.Router()

router.route("/userId").get(cartHandler.getUserCartItems)
router
  .route("/userId/:productId")
  .delete(cartHandler.addToCart)
  .delete(cartHandler.deleteCartItem)

export default router
