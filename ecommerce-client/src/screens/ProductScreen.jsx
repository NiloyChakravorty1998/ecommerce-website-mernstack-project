import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { Image, ListGroup, Row, Col, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { currentProductState } from '../../store/atoms/productByIdApiAtom'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { BASE_URL } from '../config'

const ProductScreen = () => {

    const { id: productId } = useParams();
    const [product, setProduct] = useRecoilState(currentProductState);
    const [loading, setLoading] = useState(true);
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
    }, [setProduct]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Message variant={'danger'}> {error.message} </Message>
    }

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
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
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
