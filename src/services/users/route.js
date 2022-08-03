import express from "express"
import userHandler from "./controller.js"

const userRouter = express.Router()

userRouter.route("/").get(userHandler.getAll).post(userHandler.createNewUser)

export default userRouter
