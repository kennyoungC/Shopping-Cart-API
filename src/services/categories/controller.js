import createHttpError from "http-errors"
import models from "../../db/models/index.js"
import Sequelize from "sequelize"
import { categories } from "../../data/category.js"

const { Category } = models

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.send(categories)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
const createNewCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.bulkCreate(categories)
    res.send(newCategory)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
// const createSingleCategory = async (req, res, next) => {
//   try {
//     const newCategory = await Category.create(req.body)
//     res.send(newCategory)
//   } catch (error) {
//     next(createHttpError(400, error.message))
//   }
// }
const categoriesHandler = {
  getAllCategories,
  createNewCategory,
}
export default categoriesHandler
