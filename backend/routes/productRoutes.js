import express from 'express'
// import products from '../data/products.js'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

//put above '/:id', otherwise top will be regarded as id
router.get('/top', getTopProducts)

router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)
router
  .route('/:id/reviews')
  .post(protect, checkObjectId, createProductReview)
  .delete(protect, admin, checkObjectId, deleteProductReview)

export default router
