import express from 'express'
import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Product from '../models/productModel';
const productRouter = express.Router();

productRouter.get('/',asyncHandler(async(req: Request, res:Response) => {
   const products = await Product.find({});
   res.status(200).json(products);
}));

productRouter.get('/:id',asyncHandler(async(req: Request, res:Response) => {
    const product = await Product.findById(req.params.id);
    if(product)
    {
        return res.status(200).json(product);
    }
    else{
        res.status(404);
        throw new Error('Resource not found');
    }
}));

export default productRouter;