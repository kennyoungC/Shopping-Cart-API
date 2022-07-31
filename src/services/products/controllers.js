import createHttpError from "http-errors"
import models from "../../db/models/index.js"
import Sequelize from "sequelize"

const Op = Sequelize.Op

const { Product, Review } = models
const getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Review })
    res.send(products)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
const searchByName = async (req, res, next) => {
  try {
    const name = req.query.name
    console.log("QUERY", name)
    const products = await Product.findAll({
      include: Review,
      where: { name: { [Op.like]: `%${name}%` } },
    })
    res.send(products)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
const createNewProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.send(newProduct)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      next(createHttpError(404, "Product Not found"))
    } else {
      res.send(product)
    }
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const editProduct = async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    res.send(product)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const rows = Product.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(204).send({ rows })
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const productsHandler = {
  getAll,
  createNewProduct,
  searchByName,
  getProductById,
  editProduct,
  deleteProduct,
}
export default productsHandler
