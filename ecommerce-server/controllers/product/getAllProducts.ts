import { Request, Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import Product from '../../models/productModel';

const getAllProducts= asyncHandler(async(req: Request, res:Response) => {
    const products = await Product.find({});
    res.status(200).json(products);
 });
 
 export default getAllProducts;