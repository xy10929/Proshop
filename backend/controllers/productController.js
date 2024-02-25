import asyncHandler from '../middleware/asyncHandler.js'
//asyncHandler wraps async function of mongoose
import Product from '../models/productModel.js'
//bring data from model

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  //get data from DB
  res.json(products)
})

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  } else {
    throw new Error('Resource not found')
  }
})

export { getProducts, getProductById }
