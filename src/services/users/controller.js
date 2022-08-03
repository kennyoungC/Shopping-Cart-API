import createHttpError from "http-errors"
import models from "../../db/models/index.js"

const { User, Review, Comment, Product } = models
const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Review, include: Product }, Comment],
    })
    res.send(users)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const createNewUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const userHandler = {
  getAll,
  createNewUser,
}
export default userHandler
