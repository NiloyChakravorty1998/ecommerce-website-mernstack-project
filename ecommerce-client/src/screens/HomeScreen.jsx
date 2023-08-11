import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Product from './Product'
import {productState} from '../../store/atoms/productsApiAtom'

axios.defaults.baseURL = 'http://localhost:5000'

const HomeScreen = () => {
  const [products, setProducts] = useRecoilState(productState);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  },[setProducts])
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
