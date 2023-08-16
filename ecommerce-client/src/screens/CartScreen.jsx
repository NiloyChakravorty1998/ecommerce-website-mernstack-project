import  { useEffect } from 'react'; // Import React and useEffect
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../../store/atoms/cartState';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../components/Message';
import { FaTrash } from 'react-icons/fa';
import { removeFromCart } from '../functions/utils';
import { cartValueSelector } from '../../store/selectors/cartValueSelector';

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartSt, setCartSt] = useRecoilState(cartState);

  const cartValue = useRecoilValue(cartValueSelector);

  const addToCartHandler = async (product, newQty) => {
    const updatedCart = { ...cartValue };
    const updatedCartItems = updatedCart.cartItems.map((item) =>
      item._id === product._id ? { ...item, qty: newQty } : item
    );
    updatedCart.cartItems = updatedCartItems;
    setCartSt(updatedCart);
  };

  const handleRemoveItem = (item) => {
    const updatedSt = removeFromCart(cartSt, item);
    setCartSt(updatedSt);
  };

  // Use useEffect to update local storage whenever cartSt changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartValue));
  }, [cartSt, cartValue]);

  const handleCheckout = () => {
    navigate('/login?redirect=/shipping')
  }

  const { cartItems } = cartSt;
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item,Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => handleRemoveItem(item)}>
                      <FaTrash/>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              ${ cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className="btn-block" disabled={cartItems.length===0} onClick={handleCheckout}>
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen;