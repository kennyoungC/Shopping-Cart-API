import express from "express"
import cartHandler from "./controllers.js"
const router = express.Router()

router.route("/:userId").get(cartHandler.getUserCartItems)
router.route("/:userId/:productId").post(cartHandler.addToCart)
router.route("/:cartId").delete(cartHandler.deleteCartItem)

export default router
