import sequelize from "../index.js"
import s from "sequelize"
const { DataTypes } = s

const Cart = sequelize.define(
  "carts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
)

export default Cart
