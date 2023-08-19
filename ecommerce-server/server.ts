import express, { Request, Response } from "express";
import products from './data/products.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRouter from "./routes/product-routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/user-routes/userRoutes.js";
const port : string = process.env.PORT!;

dotenv.config();

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend's URL
    credentials: true, // Allow cookies to be included in the request
  }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => {
    console.log(`App started on port: ${port}`);
})