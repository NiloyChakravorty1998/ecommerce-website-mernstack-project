import express from 'express'
import { Request, Response } from 'express';
import products from '../data/products';
const productRouter = express.Router();

productRouter.get('/',(req: Request, res:Response) => {
    res.status(200).json(products);
})

// productRouter.get('/:id',(req: Request, res:Response) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.status(200).json(product);
// })

export default productRouter;