import express, { Request, Response } from "express";

const port : number = 5000;
const app = express();

app.get('/', (req:Request,res:Response)=> {
    res.send('Hello!')
});

app.listen(port,() => {
    console.log(`App started on port: ${port}`);
})