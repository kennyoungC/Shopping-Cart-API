import express from "express"
import userHandler from "./controller.js"

const userRouter = express.Router()

userRouter.route("/").get(userHandler.getAll).post(userHandler.createNewUser)

userRouter
  .route("/:id")
  .get(userHandler.getSingleUser)
  .put(userHandler.editUser)
  .delete(userHandler.deleteUser)
export default userRouter
