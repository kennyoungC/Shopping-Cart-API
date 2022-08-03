import sequelize from "../index.js"
import s from "sequelize"
const { DataTypes } = s

const User = sequelize.define("users", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "full name must have a text" },
      notEmpty: { msg: "text must not be empty" },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "User must have a username" },
      notEmpty: { msg: "Username must not be empty" },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "User must have an email" },
      notEmpty: { msg: "Email must not be empty" },
      isEmail: { msg: "Email must be valid" },
    },
  },
})

export default User
