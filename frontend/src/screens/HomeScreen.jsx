import { Row, Col } from 'react-bootstrap'
// import products from '../products'
// import { useEffect, useState } from 'react'
import Product from '../components/Product'
// import axios from 'axios'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

const HomeScreen = () => {
  //get pagenumber for url
  const { pageNumber } = useParams()

  //data: products for current page and pagination info
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber })

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
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              //sm: 1 col, md: 2 cols...
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  )
}

export default HomeScreen
