import Product from "./products.js"
import Review from "./reviews.js"
import Category from "./category.js"
import ProductCategory from "./productCategory.js"
import User from "./users.js"
import Comment from "./comments.js"

// PRODUCT -> REVIEW
Product.hasMany(Review, { onDelete: "CASCADE" })
Review.belongsTo(Product, { onDelete: "CASCADE" })

// USER -> REVIEW (ONE TO MANY)
User.hasMany(Review, { onDelete: "CASCADE" })
Review.belongsTo(User, { onDelete: "CASCADE" })

// USER -> COMMENT (ONE TO MANY)
User.hasMany(Comment, { onDelete: "CASCADE" })
Comment.belongsTo(User, { onDelete: "CASCADE" })

// PRODUCT -> CATEGORY (MANY TO MANY)
Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
})
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
})

export default { Product, Review, Category, ProductCategory, User, Comment }
