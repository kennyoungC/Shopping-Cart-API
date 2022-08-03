import createHttpError from "http-errors"
import models from "../../db/models/index.js"
const { Comment } = models

const postComment = async (req, res, next) => {
  try {
    const { userId } = req.params
    const comments = await Comment.create(req.body, {
      where: {
        userId,
      },
      returning: true,
    })
    res.send(comments)
  } catch (error) {
    next(createHttpError(400, error))
  }
}

const editComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const deleteComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const commentsHandler = {
  postComment,
  editComment,
  deleteComment,
}

export default commentsHandler
