import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Product from './Product'
import {productState} from '../../store/atoms/productsApiAtom'
import Loader from '../components/Loader'
import Message from '../components/Message'

axios.defaults.baseURL = 'http://localhost:5000'

const HomeScreen = () => {
  const [products, setProducts] = useRecoilState(productState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false); 
      } catch (err) {
        setError(err); 
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setProducts]);

if (loading) {
  return <Loader />;
}

if (error) {
  return <Message variant={'danger'}> {error.message} </Message>
}
  
  return (
    <>
      <h1>
        Latest Products
      </h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} m={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
