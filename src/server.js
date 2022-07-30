import express from "express"
import cors from "cors"
import sequelize, { testDB } from "./db/index.js"
import productRouter from "./services/products/route.js"
import reviewRouter from "./services/reviews/route.js"
import {
  badRequestErrorHandler,
  unauthorizedErrorHandler,
  notFoundErrorHandler,
  genericErrorHandler,
} from "./errorHandlers.js"
const server = express()
server.use(express.json())
server.use(cors())

server.use("/products", productRouter)
server.use("/reviews", reviewRouter)

const { PORT } = process.env

const initialize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT)
      await testDB()
      await sequelize.sync({ logging: false, force: true })
    })

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
// *********** Middleware Error Handlers ***********
server.use(badRequestErrorHandler) // 400
server.use(unauthorizedErrorHandler) // 401
server.use(notFoundErrorHandler) // 404
server.use(genericErrorHandler) // 500
initialize()
