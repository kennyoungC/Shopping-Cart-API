import { Sequelize } from "sequelize"

const { PGHOST, PGPORT, PGDATABASE, PGPASSWORD, PGUSER, NODE_ENV } = process.env

const sequelize = new Sequelize("cart", "root", "", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
})

export const testDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("DB is Successfully connected")
  } catch (error) {
    console.log("DB connection failed")
  }
}

export default sequelize
