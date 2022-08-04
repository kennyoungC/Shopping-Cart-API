import createHttpError from "http-errors"
import models from "../../db/models/index.js"
import Sequelize, { where } from "sequelize"
import ProductCategory from "../../db/models/ProductCategory.js"

const Op = Sequelize.Op

const { Product, Review, Category, Comment, User } = models
const getAll = async (req, res, next) => {
  try {
    const { search, category } = req.query
    const products = await Product.findAll({
      limit: 10,
      offset: req.query.offset,
      include: [
        {
          model: Category,
          where: category
            ? {
                name: { [Op.like]: `%${category}%` },
              }
            : {},
        },
        { model: Comment, include: User },
        Review,
      ],
      where: {
        ...(search && {
          name: { [Op.iLike]: `%${search}%` },
        }),
      },
    })
    res.send(products)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}
const getMaxProd = async (req, res, next) => {
  try {
    const products = await Product.max("price")
    console.log(products)
    res.send(products)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const createNewProduct = async (req, res, next) => {
  try {
    const { categories, ...rest } = req.body
    const newProduct = await Product.create(rest)
    console.log("CATEGORIES", categories)
    let values
    if (Array.isArray(categories)) {
      values = categories.map((category) => ({
        productId: newProduct.id,
        categoryId: category,
      }))
      await ProductCategory.bulkCreate(values)
    } else {
      values = {
        productId: newProduct.id,
        categoryId: categories,
      }
      await ProductCategory.create(values)
    }
    console.log("VALUES", values)

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
  getProductById,
  editProduct,
  deleteProduct,
  getMaxProd,
}
export default productsHandler
