import Product from "./Products.js"
import Review from "./Reviews.js"
import Category from "./Category.js"
import ProductCategory from "./ProductCategory.js"
import User from "./Users.js"
import Comment from "./Comments.js"
import Cart from "./Cart.js"

// PRODUCT -> REVIEW
Product.hasMany(Review, { onDelete: "CASCADE" })
Review.belongsTo(Product, { onDelete: "CASCADE" })

// USER -> REVIEW (ONE TO MANY)
User.hasMany(Review, { onDelete: "CASCADE" })
Review.belongsTo(User, { onDelete: "CASCADE" })

// USER -> COMMENT (ONE TO MANY)
User.hasMany(Comment, { onDelete: "CASCADE" })
Comment.belongsTo(User, { onDelete: "CASCADE" })

// PRODUCT -> COMMENT (ONE TO MANY)
Product.hasMany(Comment, { onDelete: "CASCADE" })
Comment.belongsTo(Product, { onDelete: "CASCADE" })

// PRODUCT -> CATEGORY (MANY TO MANY)
Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
})
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
})

// CART -> PRODUCT AND USER (SUPER MANY TO MANY)
Product.belongsToMany(User, { through: { model: Cart, unique: false } })
User.belongsToMany(Product, { through: { model: Cart, unique: false } })

Product.hasMany(Cart, { onDelete: "CASCADE" })
Cart.belongsTo(Product, { onDelete: "CASCADE" })

User.hasMany(Cart, { onDelete: "CASCADE" })
Cart.belongsTo(User, { onDelete: "CASCADE" })

export default {
  Product,
  Review,
  Category,
  ProductCategory,
  User,
  Comment,
  Cart,
}
