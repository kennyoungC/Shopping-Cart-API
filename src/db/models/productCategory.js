import sequelize from "../index.js"
import s from "sequelize"
const { DataTypes } = s

const ProductCategory = sequelize.define(
  "product_category",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    timestamps: false,
  }
)
export default ProductCategory
