import { Sequelize } from "sequelize"

const { PGHOST, PGPORT, PGDATABASE, PGPASSWORD, PGUSER } = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
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
