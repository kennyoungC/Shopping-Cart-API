import express from "express"
import commentsHandler from "./controllers.js"

const router = express.Router()

router
  .route("/")
  .post(commentsHandler.postComment)
  .get(commentsHandler.getAllComments)
router
  .route("/:commentId")
  .put(commentsHandler.editComment)
  .delete(commentsHandler.deleteComment)

export default router
