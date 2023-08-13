import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { Image, ListGroup, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { currentProductState } from '../../store/atoms/productAtom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { BASE_URL } from '../config'
import { cartState } from '../../store/atoms/cartState';
import { addToCart } from '../functions/utils';

const ProductScreen = () => {

    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useRecoilState(cartState);
    const [product, setProduct] = useRecoilState(currentProductState);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/api/products/${productId}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [setProduct, productId]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Message variant={'danger'}> {error.message} </Message>
    }

    const handleAddToCart = (product) => {
        const updatedCart = addToCart(cart, { ...product, qty });
        setCart(updatedCart);
        navigate('/cart');
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>
                                {product.name}
                            </h3>
                        </ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <ListGroup.Item />
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6> Description: </h6>  {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong> ${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                            >
                                                {[...Array(product.countInStock).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={() => handleAddToCart(product)}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen