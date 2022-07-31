import createHttpError from "http-errors"
import models from "../../db/models/index.js"

const { Product, Review } = models
const getAll = async (req, res, next) => {
  try {
    const rev = await Review.findAll({
      include: Product,
    })
    res.send(rev)
  } catch (error) {
    next(createHttpError(400, error))
  }
}

const createNewReview = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } })
    console.log(product)
    if (product) {
      const rev = await Review.create({
        ...req.body,
        productId: product.id,
      })
      res.send(rev)
    } else {
      res.status(404).send("No Product with the ID " + req.params.id)
    }
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const getSingleReview = async (req, res, next) => {
  try {
    const rev = await Review.findOne({
      where: { id: req.params.id },
      include: Product,
    })

    res.send(rev)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const editSingleReview = async (req, res, next) => {
  try {
    const updatedRev = await Review.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    })
    res.send(updatedRev)
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const deleteReview = async (req, res, next) => {
  try {
    const rows = Review.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(204).send({ rows })
  } catch (error) {
    next(createHttpError(400, error))
  }
}
const revHandler = {
  getAll,
  createNewReview,
  getSingleReview,
  editSingleReview,
  deleteReview,
}
export default revHandler
