import sequelize from "../index.js"
import s from "sequelize"
const { DataTypes } = s

const Product = sequelize.define("products", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Product must have a name" },
      notEmpty: { msg: "Name must not be empty" },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export default Product
