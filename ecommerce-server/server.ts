import express, { Request, Response } from "express";
import products from './data/products.js'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";

connectDB();

dotenv.config();
const port : string = process.env.PORT!;
const app = express();
app.use(cors());

app.use('/api/products', productRouter);
app.listen(port,() => {
    console.log(`App started on port: ${port}`);
})