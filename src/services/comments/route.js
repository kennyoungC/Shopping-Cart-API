import express from "express"
import commentsHandler from "./controllers.js"

const router = express.Router()

router.route("/:userId").post(commentsHandler.postComment)
router
  .route("/:userId/commentId/comments")
  .put(commentsHandler.editComment)
  .delete(commentsHandler.deleteComment)

export default router
