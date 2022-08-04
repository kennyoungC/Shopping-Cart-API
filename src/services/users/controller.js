import createHttpError from "http-errors"
import models from "../../db/models/index.js"

const { User, Review, Comment, Product } = models
const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Comment, include: Product }, Review],
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
const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Review, include: Product }, Comment],
    })
    res.send(user)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const editUser = async (req, res, next) => {
  try {
    const data = await User.update(req.body, {
      where: { id: req.params.id },
    })
    res.send(data)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const rows = await User.destroy({
      where: { id: req.params.id },
    })
    if (rows > 0) {
      res.status(204).send("User deleted")
    } else {
      res.status(404).send("User not found")
    }
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const userHandler = {
  getAll,
  createNewUser,
  getSingleUser,
  editUser,
  deleteUser,
}
export default userHandler
