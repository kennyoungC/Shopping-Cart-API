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
    next(createHttpError(400, error.message))
  }
}
const revHandler = {
  getAll,
}
export default revHandler
