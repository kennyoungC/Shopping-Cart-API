import sequelize from "../index.js"
import s from "sequelize"
const { DataTypes } = s

const Review = sequelize.define("reviews", {
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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Review must have a username" },
      notEmpty: { msg: "Username must not be empty" },
    },
  },
})

export default Review
