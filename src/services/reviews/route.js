import express from "express"
import revHandler from "./controllers.js"

const router = express.Router()

router.route("/").get(revHandler.getAll)

export default router
