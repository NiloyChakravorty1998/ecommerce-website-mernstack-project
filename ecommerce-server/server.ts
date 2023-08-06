import express, { Request, Response } from "express";
import products from './data/products.js'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js";

connectDB();

dotenv.config();
const port : string = process.env.PORT!;
const app = express();
app.use(cors());

app.get('/', (req:Request,res:Response)=> {
    res.send('Hello!')
});

app.get('/api/products',(req: Request, res:Response) => {
    res.status(200).json(products);
})

// app.get('/api/products/:id',(req: Request, res:Response) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.status(200).json(product);
// })
app.listen(port,() => {
    console.log(`App started on port: ${port}`);
})