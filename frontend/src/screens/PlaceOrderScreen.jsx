import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  const placeOrderHandler = async () => {
    try {
      //from ...ApiSlice -> call it
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        // itemsPrice: cart.itemsPrice,
        // taxPrice: cart.taxPrice,
        // shippingPrice: cart.shippingPrice,
        // totalPrice: cart.totalPrice,
      }).unwrap()

      //from ...Slice -> dispatch(action)
      dispatch(clearCartItems())

      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                <br />
                {cart.shippingAddress.address}
                <br />
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                <br />
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Paymethod Method</h2>
              <strong>Method: </strong>
              {cart.shippingAddress.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Total:</h4>
                  </Col>
                  <Col>
                    <h4>${cart.totalPrice}</h4>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'> {error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
