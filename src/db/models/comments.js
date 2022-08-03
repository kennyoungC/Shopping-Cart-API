import sequelize from "../index.js"
import s from "sequelize"
const { DataTypes } = s

const Comment = sequelize.define("comments", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: "Review must have a text" },
      notEmpty: { msg: "text must not be empty" },
    },
  },
})

export default Comment
