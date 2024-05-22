//asyncHandler wraps async function of mongoose
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  //product number of each page
  const pageSize = 1

  //current page number
  const page = Number(req.query.pageNumber) || 1

  //for search
  //$regex - less strictly match
  //options:'i' - case sensitive
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  //total number of products
  const count = await Product.countDocuments({ ...keyword })

  //get products need for current page
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  //page and pages for pagination
  //pages: total number of pages
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    //in frontend/public/ folder
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Resourse not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Resourse not found')
  }
})

// @desc    Create a review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (rating === 0) {
    res.status(400)
    throw new Error('Rating is required')
  }

  if (product) {
    //check the user._id of each review to see if the user has already reviewed
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }

    //add review
    product.reviews.push(review)

    //update numReviews and rating of the product
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Resourse not found')
  }
})

// @desc    delete a review
// @route   DELETE /api/products/:id/reviews
// @access  Private/Admin
const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const userId = req.body.userId

  if (product) {
    product.reviews.pull({ user: userId })

    product.numReviews -= 1

    if (product.numReviews === 0) {
      product.rating = 0
    } else {
      //not working
      // product.rating =
      //   product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      //   product.numReviews

      let sum = 0
      for (let i = 0; i < product.numReviews; i++) {
        sum += product.reviews[i].rating
      }

      product.rating = sum / product.numReviews
    }

    await product.save()
    res.status(201).json({ message: 'Review deleted' })
  } else {
    res.status(404)
    throw new Error('Resourse not found')
  }
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
}
