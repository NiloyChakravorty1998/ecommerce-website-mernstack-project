import express from 'express'
import getProductById from '../../controllers/product/getProductById';
import getAllProducts from '../../controllers/product/getAllProducts';
const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductById);

export default productRouter;