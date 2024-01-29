import mongoose from "mongoose";
import express from "express";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

import cors from 'cors';



const PORT = 3000;

const app = express();
//connecting db
mongoose.connect("mongodb+srv://priyanshu123:priyanshu123@cluster0.vgrtzij.mongodb.net/navnari?retryWrites=true&w=majority").then(()=>{
    console.log("db connected");
})

const corsOptions = {
    origin: 'http://127.0.0.1:5501',
    credentials: true,
  };
  app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRoutes)





app.listen(PORT, ()=>{
    console.log(`Port running on ${PORT}`);
})