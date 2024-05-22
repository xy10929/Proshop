import { Row, Col } from 'react-bootstrap'
// import products from '../products'
// import { useEffect, useState } from 'react'
import Product from '../components/Product'
// import axios from 'axios'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams, Link } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  //get pagenumber for url
  const { pageNumber, keyword } = useParams()

  //data: products for current page and pagination info
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })

  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products')
  //     setProducts(data)
  //   }

  //   fetchProducts()
  // }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to='/' className='btn btn-light mb-4'>
              Go Back
            </Link>
          )}
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              //sm: 1 col, md: 2 cols...
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <br />
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
