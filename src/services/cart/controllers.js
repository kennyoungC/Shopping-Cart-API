import createHttpError from "http-errors"
import sequelize from "../../db/index.js"
import models from "../../db/models/index.js"
const { Product, User, Cart, Category } = models

const getUserCartItems = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.params.userId },
      include: { model: Product, include: Category },
      attributes: [
        "productId",
        [sequelize.fn("COUNT", sequelize.col("productId")), "qty"],
        [sequelize.fn("SUM", sequelize.col("product.price")), "total"],
      ],
      group: ["productId", "product.id", "product.category.id"],
    })

    const totalQty = await Cart.count({
      where: { userId: req.params.userId },
    })

    const totalPrice = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
    })

    res.send({ cart, totalQty, totalPrice })
  } catch (error) {
    next(createHttpError(400, error))
  }
}

const addToCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.params
    const data = await Cart.create({ userId, productId })
    res.send(data)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const deleteCartItem = async (req, res, next) => {
  try {
    const { userId, productId } = req.params
    const rows = await Cart.destroy({ where: { userId, productId } })
    res.status(204).send({ rows })
  } catch (error) {
    next(createHttpError(400, error))
  }
}

const cartHandler = {
  getUserCartItems,
  addToCart,
  deleteCartItem,
}

export default cartHandler
