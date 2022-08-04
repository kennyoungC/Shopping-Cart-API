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
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id)
    res.send(category)
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
const editCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    res.send(newCategory)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
const deleteCategory = async (req, res, next) => {
  try {
    const rows = await Category.destroy({
      where: { id: req.params.id },
    })
    if (rows > 0) {
      res.status(204).send("Category deleted")
    } else {
      res.status(404).send("Category not found")
    }
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
const categoriesHandler = {
  getAllCategories,
  createNewCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
}
export default categoriesHandler
