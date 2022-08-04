import createHttpError from "http-errors"
import models from "../../db/models/index.js"
const { Comment, Product } = models

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: Product,
    })

    res.send(comments)
  } catch (error) {
    next(createHttpError(400, error))
  }
}

const postComment = async (req, res, next) => {
  try {
    if (!req.body.productId || !req.body.userId) {
      throw new Error("Product and User ID are required")
    }

    const comments = await Comment.create(req.body)
    res.send(comments)
  } catch (error) {
    next(createHttpError(400, error))
  }
}

const editComment = async (req, res, next) => {
  try {
    const comments = await Comment.update(req.body, {
      where: { id: req.params.commentId },
      returning: true,
    })
    res.send(comments)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const deleteComment = async (req, res, next) => {
  try {
    const comments = await Comment.destroy({
      where: { id: req.params.commentId },
    })
    if (comments > 0) {
      res.status(204).send("Comment deleted")
    } else {
      res.status(404).send("Comment not found")
    }
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const commentsHandler = {
  postComment,
  editComment,
  deleteComment,
  getAllComments,
}

export default commentsHandler
